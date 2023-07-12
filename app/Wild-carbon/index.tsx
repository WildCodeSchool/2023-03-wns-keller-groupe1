import { registerRootComponent } from "expo";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import Toast from 'react-native-toast-message';

import App from "./src/navigation/appContainer";

const client = new ApolloClient({
  uri: 'http://192.168.4.161:4000/', 
  cache: new InMemoryCache()
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
    <Toast />
  </ApolloProvider>
);

registerRootComponent(ApolloApp);
