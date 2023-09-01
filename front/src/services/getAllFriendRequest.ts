import { gql, useQuery } from '@apollo/client';
import { toast } from "react-toastify";

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

export const useGetAllFriendRequests = (userId : number|undefined) => {
  const { data, error, loading ,refetch } = useQuery(GET_ALL_FRIEND_REQUESTS, {
    variables: { userId },
    onError: (error) => {
      toast.error(`Error getting friend requests: ${error.message}`);
    },
  });

  return { 
    friendRequests: data?.getAllFriendRequest || [],
    error,
    loading,
    refetch,
  };
};
