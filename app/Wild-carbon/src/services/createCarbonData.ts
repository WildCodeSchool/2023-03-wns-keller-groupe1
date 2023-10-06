import React from "react";
import { gql, useMutation } from "@apollo/client";
import Toast from "react-native-toast-message";
import { GET_USER } from "./getUserCarbonData";
import { err } from "react-native-svg/lib/typescript/xml";

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
    $consumption: Float!
    $category: String!
    $title: String!
    $updateCarbonDataId: Float!
  ) {
    updateCarbonData(
      consumption: $consumption
      category: $category
      title: $title
      id: $updateCarbonDataId
    )
  }
`;

const CreateCarbonData = () => {
  const [createNewCarbonData, carbonData] = useMutation(CREATE_CARBON_DATA, {
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: `Erreur lors de la création de la dépense carbone: ${error.message}`,
      });
      console.log(error, error.message);
    },
    onCompleted: (data) => {
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Une nouvelle dépense carbone a bien été créé",
      });
    },
    refetchQueries: [GET_USER],
  });

  const [updateCarbonData, updatedCarbonData] = useMutation(
    UPDATE_CARBON_DATA,
    {
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: `Erreur lors de la modification de la dépense carbone: ${error.message}`,
        });
      },
      onCompleted: (data) => {
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: "La dépense carbone a bien été modifié",
        });
      },
      refetchQueries: [GET_USER],
    }
  );

  const handleFormSubmit = async (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | {},
    title: string,
    consumption: number,
    categoryString: string,
    userId: number,
    selectedDate: Date
  ): Promise<any> => {
    await createNewCarbonData({
      variables: {
        userId: userId,
        category: categoryString,
        consumption: consumption,
        title: title,
        createdAt: selectedDate.toISOString(),
      },
    });
  };

  const handleUpdateFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string,
    consumption: number,
    categoryString: string,
    updateCarbonDataId: string | null
  ): Promise<void> => {
    event.preventDefault();
    await updateCarbonData({
      variables: {
        category: categoryString,
        consumption: consumption,
        title: title,
        updateCarbonDataId: updateCarbonDataId,
        modifiedAt: new Date(),
      },
    });
  };

  return { handleFormSubmit, handleUpdateFormSubmit };
};

export default CreateCarbonData;
