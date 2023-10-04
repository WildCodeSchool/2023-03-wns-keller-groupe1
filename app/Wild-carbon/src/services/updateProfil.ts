import { gql, useMutation } from "@apollo/client";
import Toast from "react-native-toast-message";

const UPDATE_USER = gql`
  mutation Mutation(
    $lastname: String!
    $firstname: String!
    $email: String!
    $userId: Float!
  ) {
    updateUser(
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
      console.log(error);
      Toast.show({
        type: "error",
        text1: `Échec de la mise à jour : ${error.message}`,
      });
    },
    onCompleted: () => {
      console.log("Mise à jour réussie");
      Toast.show({
        type: "success",
        text1: "Mise à jour réussie!",
      });
    },
  });

  return { updateUser };
};
