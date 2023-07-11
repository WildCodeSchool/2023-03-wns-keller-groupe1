import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($id: Float!, $user1Id: Float!, $user2Id: Float!) {
    acceptFriendRequest(id: $id, user1Id: $user1Id, user2Id: $user2Id)
  }
`;

export const useAcceptFriendRequest = () => {
  const [acceptFriendRequest, { data, error, loading }] = useMutation(ACCEPT_FRIEND_REQUEST, {
    onError: (error) => {
      toast.error(`Erreur lors de l'acceptation de la demande d'amitié : ${error.message}`);
    },
    onCompleted: () => {
      toast.success("Demande d'amitié acceptée !");
    },
  });

  return { acceptFriendRequest, data, error, loading };
};
