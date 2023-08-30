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
  ) {
    createCarbonData(
      userId: $userId
      category: $category
      consumption: $consumption
      title: $title
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
      const modal: any = document.getElementById("new-carbon-modal");
      modal.style.display = "none";
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
        const modal: any = document.getElementById("update-carbon-modal");
        modal.style.display = "none";
      },
      refetchQueries: [GET_USER],
    }
  );

  const handleFormSubmit = async (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | {},
    title: string,
    consumption: number,
    categoryString: string,
    userId: number
  ): Promise<void> => {
    console.log(title, "title", typeof title);
    console.log(consumption, "consumption", typeof consumption);
    console.log(categoryString, "categoryString", typeof categoryString);
    console.log(userId, "userId", typeof userId);

    await createNewCarbonData({
      variables: {
        userId: userId,
        category: categoryString,
        consumption: consumption,
        title: title,
      },
    });
  };

  const handleUpdateFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string | undefined,
    co2: number | undefined,
    category: string | undefined,
    updateCarbonDataId: string | null,
    setQuery: Function,
    setCo2: Function,
    setCategory: Function,
    date?: Date
  ): Promise<void> => {
    event.preventDefault();
    await updateCarbonData({
      variables: {
        category: category,
        consumption: co2,
        title: name,
        updateCarbonDataId: updateCarbonDataId,
        modifiedAt: new Date(),
      },
    });
    setQuery("");
    setCo2(0);
    setCategory("");
  };

  return { handleFormSubmit, handleUpdateFormSubmit };
};

export default CreateCarbonData;
