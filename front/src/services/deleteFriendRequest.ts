import { useMutation, gql } from '@apollo/client';
import { toast } from "react-toastify";

const DELETE_FRIEND_REQUESTS = gql`
    mutation Mutation($deleteFriendRequestId: Float!) {
        deleteFriendRequest(id: $deleteFriendRequestId)
    }
`

export const useDeleteFriendRequests = () => {
    const [deleteFriendRequest, { data, error, loading }] = useMutation(DELETE_FRIEND_REQUESTS, {
        onError: (error) => {
            toast.error(`Error deleting friend request: ${error.message}`);
        },
    });
    
    return { 
        deleteFriendRequest, 
        data: data?.deleteFriendRequestId, 
        error, 
        loading 
    };
};


