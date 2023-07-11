import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const SAVE_DONATION = gql`
  mutation Mutation($sessionId: String!, $userid: Float!) {
    checkoutSuccess(sessionId: $sessionId, userid: $userid)
  }
`;

const CreateDonation = () => {
  const navigate = useNavigate();
	const [saveDonation, donationData] = useMutation(SAVE_DONATION, {
		onError: (error) => {
      toast.error(`Error creating donation: ${error.message}`);
    },
		onCompleted: (data) => {   
      navigate("/donations");
      toast.success("Merci pour votre donation !");
    },
	})

	const handleFormSubmit = async (
    userId: number|undefined,
    sessionId: string|undefined
	): Promise<void>  => {
    await saveDonation({
			variables: {
				userid: userId,
        sessionId: sessionId
			}
		})
	}

	return { handleFormSubmit };
}

export default CreateDonation;