import { gql, useQuery } from "@apollo/client";
import { ICarbonData } from "../interfaces/CarbonData";
import { useEffect, useState } from "react";
 export const GET_USER = gql`
  query GetUser($userId: Float!) {
    getUser(userId: $userId) {
      carbonData {
        id
        title
        consumption
        price
        categoryString
        modifiedAt
        createdAt
      }
    }
  }
`;

export const useUserCarbonData = (userId: number|undefined) => {
  const [userCarbonData, setUserCarbonData] = useState<ICarbonData[]>([]);
  const { loading, error, data ,refetch} = useQuery(GET_USER, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getUser?.carbonData) {
      const newData = data.getUser.carbonData.map((item: ICarbonData) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }));
      setUserCarbonData(newData);
    }
  }, [data]);

  return { loading, error, data: userCarbonData ,refetch };
};
