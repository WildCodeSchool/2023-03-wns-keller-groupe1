import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GET_ALL_DONATION = gql`
  query GetAllDonation {
    getAllDonation {
      amount
    }
  }
`;

export const useFetchDonations = () => {
  const [token, setToken] = useState<string | null>(null);
  const { data } = useQuery(GET_ALL_DONATION, {
    fetchPolicy: "network-only",
    skip: !token,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      setToken(savedToken);
    };

    fetchToken();
  }, []);

  const getTotalDonations = (): number => {
    let totalDonations = 0;
    console.log(data);
    if (data) {
      data.getAllDonation.forEach((element: { amount: number }) => {
        totalDonations += element.amount / 100;
      });
    }

    return totalDonations;
  };

  return getTotalDonations();
};
