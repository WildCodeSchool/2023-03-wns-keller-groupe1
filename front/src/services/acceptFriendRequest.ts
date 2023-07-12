import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { GET_FRIENDS } from "./getUserFriendList";

const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($id: Float!) {
    acceptFriendRequest(id: $id)
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
		refetchQueries: [GET_FRIENDS]
  });

  return { acceptFriendRequest, data, error, loading };
};
