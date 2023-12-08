import { gql, useQuery } from "@apollo/client";

export const GET_ALL_DONATION = gql`
  query GetAllDonation {
    getAllDonation {
      amount
    }
  }
`;

export function useGetAllDonation() {
  return useQuery(GET_ALL_DONATION, {
    fetchPolicy: "network-only",
    context: {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  });
}
