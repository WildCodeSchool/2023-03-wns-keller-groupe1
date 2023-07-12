import { registerRootComponent } from "expo";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import Toast from 'react-native-toast-message';

import App from "./src/navigation/appContainer";

// il faut votre  Adresse IPv4 si vous utiliser pas un emulateur
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
