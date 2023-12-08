import { gql, useMutation, useQuery } from "@apollo/client";
import { useGlobalState } from "../GlobalStateContext";
import { toast } from "react-toastify";

const DATA_PROFILE = gql`
  query Query($userId: Float!) {
    getUser(userId: $userId) {
      email
      firstname
      lastname
    }
  }
`;

export const useDataProfile = () => {
  const { data, error, loading } = useQuery(DATA_PROFILE, {
    variables: { userId: 1 },
    onError: (error) => {
      toast.error(`Error update echec${error.message}`);
    },
    onCompleted: () => {},
  });
  return { data, error, loading };
};

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
  const { user } = useGlobalState();
  const userId = user?.userId;
  const [updateUser, { data, error, loading }] = useMutation(UPDATE_USER, {
    onError: (error) => {
      toast.error(`Error update echec${error.message}`);
    },
    onCompleted: () => {
      toast.success("Profil mis à jour");
    },
    refetchQueries: [{ query: DATA_PROFILE, variables: { userId: userId } }],
  });
  return { updateUser };
};
