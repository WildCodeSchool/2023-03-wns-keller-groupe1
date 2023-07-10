import React from "react";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { GET_USER } from "./getUserCarbonData";

const DELETE_CARBON_DATA = gql `
  mutation DeleteCarbonData($deleteCarbonDataId: Float!) {
    deleteCarbonData(id: $deleteCarbonDataId)
  }
`;

const DeleteCarbonData = () => {
  const [deleteCarbonData] = useMutation(DELETE_CARBON_DATA, {
    onError: (error) => {
      toast.error(`Error deleting carbon data: ${error.message}`);
    },
    onCompleted: (data) => {
      toast.success("Une dépense carbone a bien été supprimé ");
    },
    refetchQueries: [GET_USER],
  })

  const handleFormSubmit = async (
    carbonDataId: string
	): Promise<void>  => {
		await deleteCarbonData({
			variables: {
				deleteCarbonDataId: carbonDataId,
			}
		})
	}

  return { handleFormSubmit };
}

export default DeleteCarbonData;