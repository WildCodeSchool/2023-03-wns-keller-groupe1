import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Toast from "react-native-toast-message";

const GET_USERS_BY_NAME = gql`
  query GetUsersByName($name: String!) {
    getUsersByName(name: $name) {
      userId
      firstname
      lastname
    }
  }
`;

export const GetUsersByName = () => {
  const [getUsersByName, { data, error, loading }] = useLazyQuery(
    GET_USERS_BY_NAME,
    {
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `Erreur lors de la récupération des données utilisateur: ${error.message}`,
        });
      },
    }
  );

  console.log("data", data);
  return { getUsersByName, data, error, loading };
};
