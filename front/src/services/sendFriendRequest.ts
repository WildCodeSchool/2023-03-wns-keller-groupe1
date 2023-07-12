import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($userId: Float!, $friendId: Float!) {
    sendFriendRequest(userId: $userId, friendId: $friendId)
  }
`;

export const useSendFriendRequest = () => {
  const [sendFriendRequest, { data, error, loading }] = useMutation(SEND_FRIEND_REQUEST, {
    onError: (error) => {
      toast.error(`Error sending friend request: ${error.message}`);
    },
    onCompleted: () => {
      toast.success("Friend request sent!");
    },
  });

  return { sendFriendRequest, data, error, loading };
};
