import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

export const CREATE_DONATION = gql`
  mutation Mutation($userid: Float!) {
    checkoutDonation(userid: $userid)
  }
`;

const SaveDonation = () => {
	const [createNewDonation] = useMutation(CREATE_DONATION, {
		onError: (error) => {
      toast.error(`Error creating donation: ${error.message}`);
    },
		onCompleted: (data) => {   
      window.location.href = data.checkoutDonation;
    },
		context: {
      headers: {
        "authorization": `Bearer ${sessionStorage.getItem("token")}`
      }
    }
	})

	const handleFormSubmit = async (
    userId: string|null
	): Promise<void>  => {
		if (userId) {
			const parsedUserId = parseInt(userId);
			await createNewDonation({
				variables: {
					userid: parsedUserId
				}
			})
		}
	}

	return { handleFormSubmit };
}

export default SaveDonation;