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
<<<<<<< HEAD
  const { data, error, loading , refetch} = useQuery(GET_FRIENDS, {
    variables: { userId },
  });
=======
  const { data, error, loading } = useQuery(GET_FRIENDS, {
    variables: { userId },
  });
  console.log(data, "Data from getUserFriendList");
>>>>>>> dda043704cb191f77ff363c2075b0de7c724f398
  return {
    userFriendsLists: data?.getFriends || [],
    error,
    loading,
<<<<<<< HEAD
    refetch,
=======
>>>>>>> dda043704cb191f77ff363c2075b0de7c724f398
  };
};
