import { gql, useMutation } from "@apollo/client";

import { toast } from "react-toastify";

const UPDATE_USER = gql`
  mutation Mutation(
    $tel: String!
    $gender: String!
    $about: String!
    $city: String!
    $age: String!
    $totalCo2: Float!
    $lastname: String!
    $firstname: String!
    $email: String!
    $userId: Float!
  ) {
    updateUser(
      tel: $tel
      gender: $gender
      about: $about
      city: $city
      age: $age
      totalCo2: $totalCo2
      lastname: $lastname
      firstname: $firstname
      email: $email
      userId: $userId
    )
  }
`;

export const useUpdateUsers = () => {
  const [updateUser, { data, error, loading }] = useMutation(UPDATE_USER, {
    onError: (error) => {
      toast.error(`Error update echec${error.message}`);
    },
    onCompleted: () => {
      toast.success("Profil mis à jour");
    },
  });
  return { updateUser };
};
