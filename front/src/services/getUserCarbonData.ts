import { gql, useQuery } from "@apollo/client";
import {ICarbonData} from '../interface/CarbonData';
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
    fetchPolicy: "network-only",

  });

  let userCarbonData = data?.getUser?.carbonData;
console.log(userCarbonData)

if(userCarbonData) {
  userCarbonData = userCarbonData.map((item: ICarbonData) => ({ 
    ...item, 
    createdAt: new Date(item.createdAt)
  }));
}
  return { loading, error, data: userCarbonData };
};
