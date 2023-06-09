import { useState } from "react";
import NewCarbonDataForm from "../../components/Form/NewCarbonDataForm";
import CreateCarbonData from "../../services/createCarbonData";
import styles from "./HomePage.module.css";
import UserSummary from "../../components/dashboard/UserSummary";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import StatsSection from "../../components/dashboard/StatsSection";
import CommunitySection from "../../components/dashboard/CommunitySection";
import NewDonationForm from "../../components/Form/NewDonationForm";
import UpdateCarbonDataForm from "../../components/Form/UpdateCarbonDataForm";
import Chat from "../Chat/Chat";

const HomePage = () => {
  const [name, setName] = useState<string|undefined>();
  const [category, setCategory] = useState<string|undefined>();
  const [co2, setCo2] = useState<number|undefined>(0);
  const [updateCarbonDataId, setUpdateCarbonDataId] = useState<string|null>("");
  const [query, setQuery] = useState("");
  const { handleFormSubmit, handleUpdateFormSubmit } = CreateCarbonData();

  let parsedUserId;

  if (sessionStorage.getItem("user_id")) {
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      parsedUserId = parseInt(userId);
    }
  }
  
  const { loading, error, data } = useUserCarbonData(parsedUserId);

  const modalDonationTest: any = document.getElementById("new-donation-modal");
  const handleModalDonation = () => {
    modalDonationTest.style.display = "block";
  }

  const modal: any = document.getElementById("new-carbon-modal");
  const donationModal: any = document.getElementById("new-donation-modal");
  const updateCarbonDataModal: any = document.getElementById("update-carbon-modal");

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
      setCategory("");
      setCo2(0);
      setQuery("");
      setName("");
    }
    if (event.target === donationModal) {
      donationModal.style.display = "none";
    }  
    if (event.target === updateCarbonDataModal) {
      updateCarbonDataModal.style.display = "none";
      setCategory("");
      setCo2(0);
      setQuery("");
      setName("");
      setUpdateCarbonDataId("");
    }  
  } 

  return (
    <>
      <div className={styles.MainContainer}>
        <div>
          <UserSummary 
            data={data} 
            setQuery={setQuery}
            setName={setName}
            setCategory={setCategory} 
            setCo2={setCo2}
            setUpdateCarbonDataId={setUpdateCarbonDataId}
          />
        </div>
        <div className={styles.bottomSectionContainer}>
          <div className={styles.bottomSection}>
            <StatsSection data={data} />  
          </div>
          <div className={styles.bottomSection}>
            <CommunitySection/> 
          </div>
        </div>
        <button className={styles.donateButton} onClick={() => handleModalDonation()}>
          Contribuer au Projet
        </button>
      </div>
      <NewCarbonDataForm 
        setName={setName} 
        setCategory={setCategory} 
        setCo2={setCo2} 
        name={name}
        category={category}
        Co2={co2}
        handleFormSubmit={(e: any) => handleFormSubmit(
          e,
          query,
          co2,
          category,
          sessionStorage.getItem("user_id"),
          setQuery,
          setCo2,
          setCategory
        )}
        query={query}
        setQuery={setQuery}
      />
      <UpdateCarbonDataForm
        setName={setName} 
        setCategory={setCategory} 
        setCo2={setCo2} 
        category={category}
        Co2={co2}
        handleFormSubmit={(e: any) => handleUpdateFormSubmit(
          e,
          query,
          co2,
          category,
          updateCarbonDataId,
          setQuery,
          setCo2,
          setCategory
        )}
        query={query}
        setQuery={setQuery}
      />
      <NewDonationForm/>
    </>
  );
};

export default HomePage;
