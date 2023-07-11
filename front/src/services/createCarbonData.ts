import React from "react";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { GET_USER } from "./getUserCarbonData";
// import { useNavigate } from "react-router-dom";

export const CREATE_CARBON_DATA = gql`
  mutation CreateCarbonData(
		$userId: Float!, 
		$category: String!, 
		$price: Float!, 
		$consumption: Float!, 
		$title: String!
	) {
    createCarbonData(
			userId: $userId, 
			category: $category, 
			price: $price, 
			consumption: $consumption, 
			title: $title
		)
  }
`;

export const UPDATE_CARBON_DATA = gql `
	mutation UpdateCarbonData(
		$price: Float!, 
		$consumption: Float!, 
		$category: String!,
		$title: String!, 
		$updateCarbonDataId: Float!
	) {
		updateCarbonData(
			price: $price, 
			consumption: $consumption,
			category: $category,
			title: $title, 
			id: $updateCarbonDataId)
	}
`;

const CreateCarbonData = () => {
	// const navigate = useNavigate();

	const [createNewCarbonData, carbonData] = useMutation(CREATE_CARBON_DATA, {
		onError: (error) => {
      toast.error(`Error creating carbon data: ${error.message}`);
    },
		onCompleted: (data) => {
      toast.success("Une nouvelle dépense carbone a bien été créé");
			const modal: any = document.getElementById("new-carbon-modal");
			modal.style.display = "none";	
    },
		refetchQueries: [GET_USER]
	})

	const [updateCarbonData, updatedCarbonData] = useMutation(UPDATE_CARBON_DATA, {
		onError: (error) => {
      toast.error(`Error updating carbon data: ${error.message}`);
    },
		onCompleted: (data) => {
      toast.success("La dépense carbone a bien été modifié");
			const modal: any = document.getElementById("update-carbon-modal");
			modal.style.display = "none";	
    },
		refetchQueries: [GET_USER]
	})

	const handleFormSubmit = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		name: string|undefined,
		co2: number|undefined,
		price: number|undefined,
		category: string|undefined,
		userId: string|null,
		setQuery: Function,
		setCo2: Function,
		setPrice: Function,
		setCategory: Function
	): Promise<void>  => {
		event.preventDefault();
		if (userId) {
			const parsedUserId = parseInt(userId);
			await createNewCarbonData({
				variables: {
					userId: parsedUserId,
					category: category,
					price: price,
					consumption: co2,
					title: name
				}
			})
			setQuery("");
			setCo2(0);
			setPrice(0);
			setCategory("");
		}
	}

	const handleUpdateFormSubmit = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		name: string|undefined,
		co2: number|undefined,
		price: number|undefined,
		category: string|undefined,
		updateCarbonDataId: string|null,
		setQuery: Function,
		setCo2: Function,
		setPrice: Function,
		setCategory: Function
	): Promise<void>  => {
		event.preventDefault();
		await updateCarbonData({
			variables: {
				category: category,
				price: price,
				consumption: co2,
				title: name,
				updateCarbonDataId: updateCarbonDataId
			}
		})
		setQuery("");
		setCo2(0);
		setPrice(0);
		setCategory("");	
	}

	return { handleFormSubmit, handleUpdateFormSubmit };
}

export default CreateCarbonData;