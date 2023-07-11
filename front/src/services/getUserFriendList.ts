import { gql, useQuery } from "@apollo/client";

export const GET_FRIENDS = gql`
  query ($userId: Float!) {
    getFriends(userId: $userId) {
      userId
      lastname
      firstname
      totalCo2
    }
  }
`;

export const useGetUserFriendList = (userId: number) => {
  const { data, error, loading , refetch} = useQuery(GET_FRIENDS, {
    variables: { userId },
  });
  console.log(data, "Data from getUserFriendList");
  return {
    userFriendsLists: data?.getFriends || [],
    error,
    loading,
    refetch,
  };
};
