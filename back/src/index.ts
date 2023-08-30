import "reflect-metadata";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import dataSource from "./utils";
import { buildSchema } from "type-graphql";
import { ApolloServer, gql } from "apollo-server-express";
import UserResolver from "./resolver/UserResolver";
import CategoryResolver from "./resolver/CategoryResolver";
import CarbonDataResolver from "./resolver/CarbonDataResolver";
import UserGroupeResolver from "./resolver/UserGroupeResolver";
import DonationResolver from "./resolver/DonationResolver";
import UserFriendResolver from "./resolver/UserFriendResolver";
import BankDetailsResolver from "./resolver/BankDetailsResolver";
import { createServer } from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';
import { ChatResolver } from "./resolver/ChatResolver";
import { useServer } from "graphql-ws/lib/use/ws";
import path from "path";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
export const STRIPE_SECRET = process.env.STRIPE_SECRET as string;

// if (JWT_SECRET === undefined) {
//   throw Error("JWT secret undefined");
// }


const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/',
});

const start = async (): Promise<void> => {
  await dataSource.initialize();
  
  const typeGraphQLgeneratedSchema = await buildSchema({
    resolvers: [UserResolver, CategoryResolver, CarbonDataResolver, DonationResolver, UserGroupeResolver, UserFriendResolver, BankDetailsResolver, ChatResolver],
    authChecker: ({ context }) => {
      if (context.email !== undefined) {
        return true;
      } else {
        return false;
      }
    },
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const serverCleanup = useServer({ schema : typeGraphQLgeneratedSchema }, wsServer);

  const server = new ApolloServer({
    schema: typeGraphQLgeneratedSchema,
    context: ({ req }) => {
      if (
        req.headers.authorization !== undefined &&
        req.headers.authorization !== ""
      ) {
        const payload = jwt.verify(
          req.headers.authorization.split("Bearer ")[1],
          JWT_SECRET
        );
        return payload;
      }
      return {};
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    
  });

  await server.start();

  server.applyMiddleware({ 
    app,
    path: "/"
  });

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

void start();