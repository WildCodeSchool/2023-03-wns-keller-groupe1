import { gql, useMutation, useQuery } from "@apollo/client";
import Toast from "react-native-toast-message";
import { GET_FRIENDS } from "./getUserFriendList";

const GET_ALL_FRIEND_REQUESTS = gql`
  query GetAllFriendRequests($userId: Float!) {
    getAllFriendRequest(userId: $userId) {
      id
      userSender {
        userId
        firstname
        lastname
      }
      userReceiver {
        userId
        firstname
        lastname
      }
      accepted
    }
  }
`;

const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($id: Float!) {
    acceptFriendRequest(id: $id)
  }
`;

const DELETE_FRIEND_REQUEST = gql`
  mutation DeleteFriendRequest($deleteFriendRequestId: Float!) {
    deleteFriendRequest(id: $deleteFriendRequestId)
  }
`;

const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($userId: Float!, $friendId: Float!) {
    sendFriendRequest(userId: $userId, friendId: $friendId)
  }
`;

export const useGetAllFriendRequests = (userId: number) => {
  const { data, error, loading, refetch } = useQuery(GET_ALL_FRIEND_REQUESTS, {
    variables: { userId },
    onError: handleGetAllError,
  });

  return {
    friendRequests: data?.getAllFriendRequest || [],
    error,
    loading,
    refetch,
  };
};

export const useAcceptFriendRequest = () => {
  const [acceptFriendRequest, { data, error, loading }] = useMutation(
    ACCEPT_FRIEND_REQUEST,
    {
      onError: handleAcceptError,
      onCompleted: handleAcceptCompletion,
      refetchQueries: [GET_FRIENDS],
    }
  );

  return { acceptFriendRequest, data, error, loading };
};

export const useDeleteFriendRequest = () => {
  const [deleteFriendRequest, { data, error, loading }] = useMutation(
    DELETE_FRIEND_REQUEST,
    {
      onError: handleDeleteError,
      onCompleted: handleDeleteCompletion,
    }
  );

  return {
    deleteFriendRequest,
    data: data?.deleteFriendRequestId,
    error,
    loading,
  };
};

export const useSendFriendRequest = () => {
  const [sendFriendRequest, { data, error, loading }] = useMutation(
    SEND_FRIEND_REQUEST,
    {
      onError: handleSendError,
      onCompleted: handleSendCompletion,
    }
  );

  return { sendFriendRequest, data, error, loading };
};

const handleGetAllError = (error) => {
  showToast(
    "error",
    "Erreur",
    `Erreur lors de la récupération des demandes d'amis: ${error.message}`
  );
};

const handleAcceptError = (error) => {
  showToast(
    "error",
    "Erreur",
    `Erreur lors de l'acceptation de la demande d'amitié: ${error.message}`
  );
};

const handleAcceptCompletion = () => {
  showToast("success", "Succès", "Demande d'amitié acceptée !");
};

const handleDeleteError = (error) => {
  showToast(
    "error",
    "Erreur",
    `Erreur lors de la suppression de la demande d'amitié: ${error.message}`
  );
};

const handleDeleteCompletion = () => {
  showToast("success", "Succès", "Demande d'amitié supprimée avec succès");
};

const handleSendError = (error) => {
  showToast(
    "error",
    "Erreur",
    `Erreur lors de l'envoi de la demande d'ami: ${error.message}`
  );
};

const handleSendCompletion = () => {
  showToast("success", "Succès", "Demande d'ami envoyée!");
};

const showToast = (type, title, message) => {
  Toast.show({
    type: type,
    position: "top",
    text1: title,
    text2: message,
    visibilityTime: 3000,
    autoHide: true,
  });
};
