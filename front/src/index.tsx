import ReactDOM from "react-dom";
import App from "./navigation/AppContainer";
import { GlobalStateProvider } from './GlobalStateContext';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <GlobalStateProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </GlobalStateProvider>,
  document.getElementById("root")
);
