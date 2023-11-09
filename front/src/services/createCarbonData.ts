import React from "react";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { GET_USER } from "./getUserCarbonData";
// import { useNavigate } from "react-router-dom";

export const CREATE_CARBON_DATA = gql`
  mutation CreateCarbonData(
    $userId: Float!
    $category: String!
    $consumption: Float!
    $title: String!
    $createdAt: String!
  ) {
    createCarbonData(
      userId: $userId
      category: $category
      consumption: $consumption
      title: $title
      createdAt: $createdAt
    )
  }
`;

export const UPDATE_CARBON_DATA = gql`
  mutation UpdateCarbonData(
    $id: Float!
    $title: String!
    $consumption: Float!
    $category: String!
    $createdAt: String!
  ) {
    updateCarbonData(
      id: $id
      title: $title
      consumption: $consumption
      category: $category
      createdAt: $createdAt
    )
  }
`;

const CreateCarbonData = () => {
  // const navigate = useNavigate();

  const [createNewCarbonData, carbonData] = useMutation(CREATE_CARBON_DATA, {
    onError: (error) => {
      // toast.error(`Error creating carbon data: ${error.message}`);
    },
    onCompleted: (data) => {
      toast.success("Une nouvelle dépense carbone a bien été créé");
    },
    refetchQueries: [GET_USER],
  });

  const [updateCarbonData, updatedCarbonData] = useMutation(
    UPDATE_CARBON_DATA,
    {
      onError: (error) => {
        // toast.error(`Error updating carbon data: ${error.message}`);
      },
      onCompleted: (data) => {
        toast.success("La dépense carbone a bien été modifié");
        const modal: any = document.getElementById("update-carbon-modal");
        modal.style.display = "none";
      },
      refetchQueries: [GET_USER],
    }
  );

  const handleFormSubmit = async (
    name: string | undefined,
    co2: number | undefined,
    category: string | undefined,
    userId: number | null,

    selectedDate: Date
  ): Promise<void> => {
    await createNewCarbonData({
      variables: {
        userId: userId,
        category: category,
        consumption: co2,
        title: name,
        createdAt: selectedDate.toISOString(),
      },
    });
  };

  const handleUpdateFormSubmit = async (
    name: string | undefined,
    co2: number | undefined,
    category: string | undefined,
    id: number | null,
    createdAt: string
  ): Promise<void> => {
    if (!id) {
      toast.error("L'ID de la dépense carbone est requis pour la mise à jour.");
      return;
    }

    await updateCarbonData({
      variables: {
        id,
        title: name,
        consumption: co2,
        category: category,
        createdAt,
      },
    });
  };

  return { handleFormSubmit, handleUpdateFormSubmit };
};

export default CreateCarbonData;
