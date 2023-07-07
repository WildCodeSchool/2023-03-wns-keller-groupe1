import React from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const CREATE_CARBON_DATA = gql`
  mutation CreateCarbonData(
		$userId: Float!, 
		$categoryId: Float!, 
		$price: Float!, 
		$consumption: Float!, 
		$title: String!
	) {
    createCarbonData(
			userId: $userId, 
			categoryId: $categoryId, 
			price: $price, 
			consumption: $consumption, 
			title: $title
		)
  }
`;

const GET_ALL_CATEGORIES = gql `
	query GetAllCategories {
		getAllCategories {
			categoryId
			title
		}
	}
`;

const CreateCarbonData = () => {
	// const navigate = useNavigate();

	const [getAllCategories] = useLazyQuery(GET_ALL_CATEGORIES, {
		onError: (error) => {
      		toast.error(`Error getting user data: ${error.message}`);
    },
		onCompleted: (data) => {
			return data.getAllCategories;
    },
	})

	const [createNewCarbonData, carbonData] = useMutation(CREATE_CARBON_DATA, {
		onError: (error) => {
      toast.error(`Error creating user: ${error.message}`);
    },
		onCompleted: (data) => {
      		toast.success("Une nouvelle dépense carbone a bien été créé ");
    },
	})

	const handleFormSubmit = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		name: string|undefined,
		co2: number|undefined,
		price: number|undefined,
		categoryId: number|undefined,
		userId: number|undefined
	): Promise<void>  => {
		event.preventDefault();
		await createNewCarbonData({
			variables: {
				userId: userId,
				categoryId: categoryId,
				price: price,
				consumption: co2,
				title: name
			}
		})
	}


	return { handleFormSubmit, getAllCategories };
}

export default CreateCarbonData;