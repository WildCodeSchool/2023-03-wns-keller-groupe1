import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($userId: Float!) {
    getUser(userId: $userId) {
      carbonData {
        title
        consumption
        price
        modifiedAt
        createdAt
      }
    }
  }
`;

export const useUserCarbonData = (userId: number) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId },
  });

  let userCarbonData = data?.getUser?.carbonData;

  return { loading, error, data: userCarbonData };
};
