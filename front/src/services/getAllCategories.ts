import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";

const GET_ALL_CATEGORIES = gql `
	query GetAllCategories {
		getAllCategories {
			categoryId
			title
		}
	}
`;

const GetAllCategories = () => {
	const [getAllCategories] = useLazyQuery(GET_ALL_CATEGORIES, {
		onError: (error) => {
      		toast.error(`Error getting user data: ${error.message}`);
    },
		onCompleted: (data) => {
			return data.getAllCategories;
    },
	})

	return { getAllCategories }
}

export default GetAllCategories;