import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Login from '../screens/UserConnexion/Login';
import { GlobalStateProvider } from '../GlobalStateContext';
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://192.168.1.12:4000/",
  cache: new InMemoryCache(),
});

test('Render login component and check text', () => {

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

test('Render login component and click register button', () => {

  render(
    <GlobalStateProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Login />
        </ApolloProvider>
      </BrowserRouter>     
    </GlobalStateProvider>
  );

  expect(screen.getByText(/S’inscrire/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/S’inscrire/i));
  expect(screen.getByText(/Inscrivez-vous/i)).toBeInTheDocument();
});