import ReactDOM from "react-dom";
import App from "./navigation/AppContainer";
import { GlobalStateProvider } from "./GlobalStateContext";
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const currentOrigin = window.origin;
const originWithoutProtocol = currentOrigin.replace(/^https?:\/\//, '');

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === 'production' ? `${window.origin}/graphql` : 'http://localhost:4000/'
});

const wsLink = new GraphQLWsLink(createClient({
  url: process.env.NODE_ENV === 'production' ? `${originWithoutProtocol}/graphql` : 'ws://localhost:4000/'
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <GlobalStateProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    <ToastContainer />
  </GlobalStateProvider>,
  document.getElementById("root")
);
