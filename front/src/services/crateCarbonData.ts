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

const CreateCarbonData = () => {
	// const navigate = useNavigate();

	const [createNewCarbonData, carbonData] = useMutation(CREATE_CARBON_DATA, {
		onError: (error) => {
      toast.error(`Error creating carbon data: ${error.message}`);
    },
		onCompleted: (data) => {
      toast.success("Une nouvelle dépense carbone a bien été créé ");
			const modal: any = document.getElementById("new-carbon-modal");
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

	return { handleFormSubmit };
}

export default CreateCarbonData;