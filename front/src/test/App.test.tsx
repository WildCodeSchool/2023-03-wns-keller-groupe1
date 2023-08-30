import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Login from '../screens/UserConnexion/Login';
import { GlobalStateProvider } from '../GlobalStateContext';
import {
  BrowserRouter
} from "react-router-dom";


test('render login component and check text', () => {

  const client = new ApolloClient({
    uri: "http://192.168.1.12:4000/",
    cache: new InMemoryCache(),
  });

  render(
    <GlobalStateProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Login />
        </ApolloProvider>
      </BrowserRouter>     
    </GlobalStateProvider>
  );

  const linkElement = screen.getByText(/Connectez vous/i);

  expect(linkElement).toBeInTheDocument();

});