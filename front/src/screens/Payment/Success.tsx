import { useSearchParams } from "react-router-dom";
import SaveDonation from "../../services/saveDonationInDatabase";
import { useGlobalState } from "../../GlobalStateContext";
import { useEffect } from "react";

const Success = () => {
  const { handleFormSubmit } = SaveDonation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [globalState, setGlobalState] = useGlobalState();

  console.log(searchParams.get("session_id"));

  useEffect(() => {
    if (sessionId != null && sessionStorage.getItem("user_id")) {
      const userId = sessionStorage.getItem("user_id");
      if (userId) {
        handleFormSubmit(parseInt(userId), sessionId);
      }   
    }
  }, [])
  
  return (
    <>
    </>
  )
}

export default Success;