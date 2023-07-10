import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

export const CREATE_DONATION = gql`
  mutation CreateDonation(
    $amount: Float!, 
    $userid: Float!) {
      createDonation(
        amount: $amount, 
        userid: $userid
      )
  }
`;

const CreateDonation = () => {
	const [createNewDonation, donationData] = useMutation(CREATE_DONATION, {
		onError: (error) => {
      toast.error(`Error creating donation: ${error.message}`);
    },
		onCompleted: (data) => {   
      toast.success("Merci pour votre donation !");
			const modal: any = document.getElementById("new-donation-modal");
			modal.style.display = "none";	
    },
	})

	const handleFormSubmit = async (
    userId: string|undefined,
    amount: number
	): Promise<void>  => {
    await createNewDonation({
			variables: {
				userid: userId,
				amount: amount
			}
		})
	}

	return { handleFormSubmit };
}

export default CreateDonation;