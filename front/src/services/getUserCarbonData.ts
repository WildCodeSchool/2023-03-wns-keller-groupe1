import { gql, useQuery } from "@apollo/client";
import { ICarbonData } from "../interface/CarbonData";
import {fakeData} from "../helper/helper"
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

export const useUserCarbonData = (userId: number) => {
  const [userCarbonData, setUserCarbonData] = useState<ICarbonData[]>([]);
  const { loading, error, data } = useQuery(GET_USER, {
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
      console.log("userCarbonData", newData);
    }
  }, [data]);

  return { loading, error, data: userCarbonData };
};
