import { ApolloServer } from "apollo-server";
import { buildSchemaSync } from "type-graphql";
import UserResolver from "../src/resolver/UserResolver";
import { UserInput } from "../src/validator/UserValidator";
import { validate } from "class-validator";
import dataSource from "../src/utilsTest";
import { User } from "../src/entity/User";
import jwt from "jsonwebtoken";
import CarbonDataResolver from "../src/resolver/CarbonDataResolver";
import { CarbonDataInput } from "../src/validator/CarbonDataValidator";

describe("UserResolver", () => {
  const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
  // Define server type
  let server: ApolloServer;
  let userId: number;

  beforeAll(async () => {
    // Build the GraphQL schema
    await dataSource.initialize();
    const schema = buildSchemaSync({
      resolvers: [UserResolver],
      authChecker: ({ context }) => {
        if (context.email !== undefined) {
          return true;
        } else {
          return false;
        }
      },
      validate: false, // Disable automatic validation during testing
    });

    // Create an ApolloServer instance with the schema
    server = new ApolloServer({
      schema,
      context: () => ({}), // Provide a mock context object if needed
    });
  });

  it("Validate input and creates a user", async () => {
    const email = "test@example.com";
    const password = "password";
    const firstname = "John";
    const lastname = "Doe";

    // Create a resolver instance
    const resolver = new UserResolver();

    // Manually create and validate the input arguments
    const args = new UserInput();
    args.email = email;
    args.password = password;
    args.firstname = firstname;
    args.lastname = lastname;
    const validationErrors = await validate(args);

    // Execute the mutation using the resolver instance
    const result = await resolver.createUser(
      email,
      password,
      firstname,
      lastname
    );

    // Assertions
    expect(validationErrors.length).toEqual(0);
    expect(result).toEqual("User created");
  });

  it("Login and verify JWT token", async () => {
    const email = "test@example.com";
    const password = "password";

    const resolver = new UserResolver();
    const token: any = await resolver.login(email, password);

    const result: any = jwt.verify(token, JWT_SECRET);

    expect(result.email).toEqual(email);
  });

  it("Login and refresh JWT token", async () => {
    const email = "test@example.com";
    const password = "password";

    const resolver = new UserResolver();
    const token: any = await resolver.login(email, password);
    console.log("token", token);

    const result: any = await resolver.refreshToken(token);

    expect(typeof result).toBe("string");
  });

  it("Login, get user from token", async () => {
    const email = "test@example.com";
    const password = "password";

    const resolver = new UserResolver();
    const token: any = await resolver.login(email, password);

    const result: any = await resolver.getUserFromToken(token);

    userId = result.userId;

    expect(result).toBeInstanceOf(User);
  });

  it("Get a user", async () => {
    const id = userId;

    const resolver = new UserResolver();
    const result = await resolver.getUser(id);

    expect(result).toBeInstanceOf(User);
  });

  it("Denied authorization", async () => {
    const resolver = new UserResolver();
    const result = await resolver.getAllUsers();

    expect(result).toThrowError;
  });

  it("Update a user", async () => {
    const id = userId;
    const email = "test@example.com";
    const firstname = "John";
    const lastname = "Doe";

    const resolver = new UserResolver();
    const result = await resolver.updateUser(id, email, firstname, lastname);

    expect(result).toEqual(`User ${id} updated`);
  });

  it("Validate input and creates a carbon data", async () => {
    const title = "test";
    const consumption = 123;
    const category = "test";
    const id = userId;
    const createdAt = new Date();

    // Create a resolver instance
    const resolver = new CarbonDataResolver();

    // Manually create and validate the input arguments
    const args = new CarbonDataInput();
    args.title = title;
    args.consumption = consumption;
    args.categoryString = category;
    args.userId = userId;
    args.createdAt = createdAt.toString();

    const validationErrors = await validate(args);

    // Execute the mutation using the resolver instance
    const result = await resolver.createCarbonData(
      title,
      consumption,
      category,
      id,
      createdAt.toString()
    );

    // Assertions
    expect(validationErrors.length).toEqual(0);
    expect(result).toEqual("Carbon data created");
  });

  it("Delete a user", async () => {
    const id = userId;

    const resolver = new UserResolver();
    const result = await resolver.deleteUser(id);

    expect(result).toEqual("User deleted");
  });
});
