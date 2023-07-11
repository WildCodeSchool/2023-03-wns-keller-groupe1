import { useSearchParams } from "react-router-dom";
import SaveDonation from "../../services/saveDonationInDatabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { handleFormSubmit } = SaveDonation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId != null && sessionStorage.getItem("user_id")) {
      const userId = sessionStorage.getItem("user_id");
      if (userId) {
        handleFormSubmit(parseInt(userId), sessionId);
      }   
    } else {
      navigate("/dashboard");
    }
  }, [])
  
  return (
    <>
    </>
  )
}

export default Success;