import { gql, useMutation } from "@apollo/client";
import Toast from "react-native-toast-message";
import { GET_USER } from "./getUserCarbonData";

const DELETE_CARBON_DATA = gql `
  mutation DeleteCarbonData($deleteCarbonDataId: Float!) {
    deleteCarbonData(id: $deleteCarbonDataId)
  }
`;

const DeleteCarbonData = () => {
  const [deleteCarbonData] = useMutation(DELETE_CARBON_DATA, {
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `Erreur lors de la suppression de la dépense : ${error.message}`,
      });
    },
    onCompleted: (data) => {
      Toast.show({
        type: "success",
        text1: `La dépense carbone a bien été supprimé`,
      });
    },
    refetchQueries: [GET_USER],
  })

  const handleFormSubmitDelete = async (
    carbonDataId: string
	): Promise<void>  => {
		await deleteCarbonData({
			variables: {
				deleteCarbonDataId: carbonDataId,
			}
		})
	}

  return { handleFormSubmitDelete };
}

export default DeleteCarbonData;