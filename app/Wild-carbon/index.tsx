import { registerRootComponent } from "expo";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import Toast from "react-native-toast-message";

import App from "./src/navigation/appContainer";
import { GlobalStateProvider } from "./GlobalStateContext";

// il faut votre  Adresse IPv4 si vous utiliser pas un emulateur : http://192.168.156.161:4000/
// emulateur pc : http://localhost:4000/
const client = new ApolloClient({
  uri: "http://10.0.2.2:4000/",
  cache: new InMemoryCache(),
});

const ApolloApp = () => (
  <GlobalStateProvider>
    <ApolloProvider client={client}>
      <App />
      <Toast />
    </ApolloProvider>
  </GlobalStateProvider>
);

registerRootComponent(ApolloApp);
