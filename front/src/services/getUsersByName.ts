import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";

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
  const [getUsersByName, { data, error, loading }] = useLazyQuery(GET_USERS_BY_NAME, {
    onError: (error) => {
      toast.error(`Error getting user data: ${error.message}`);
    },
  });
console.log("data", data)
  return { getUsersByName, data, error, loading };
};
