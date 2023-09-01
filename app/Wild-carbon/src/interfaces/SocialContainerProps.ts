export interface FriendRequestContainerProps {
  data: {
    id: number;
    userSender: {
      firstname: string;
      lastname: string;
    };
  };
  refetchFriendRequests: () => void;
  refetchUserFriendsLists: () => void;
}

export interface FriendUserContainerProps {
  firstname: string;
  lastname: string;
  totalCo2: number;
}
