import { useState } from "react";
import NewCarbonDataForm from "../Form/NewCarbonDataForm";
import CreateCarbonData from "../../services/crateCarbonData";
import { useGlobalState } from "../../GlobalStateContext";
import styles from "./HomePage.module.css";
import UserSummary from "./UserSummary";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import StatsSection from "./StatsSection";
import CommunitySection from "./CommunitySection";
import NewDonationForm from "../Form/NewDonationForm";

const HomePage = () => {
  const [name, setName] = useState<string|undefined>();
  const [category, setCategory] = useState<number|undefined>();
  const [price, setPrice] = useState<number|undefined>();
  const [co2, setCo2] = useState<number|undefined>();
  const { handleFormSubmit } = CreateCarbonData();
  const [globalState, setGlobalState] = useGlobalState();
  const { loading, error, data } = useUserCarbonData(globalState?.user?.userId);

  const modalDonationTest: any = document.getElementById("new-donation-modal");
  const handleModalDonation = () => {
    modalDonationTest.style.display = "block";
  }

  const modal: any = document.getElementById("new-carbon-modal");
  const donationModal: any = document.getElementById("new-donation-modal");

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
    if (event.target == donationModal) {
      donationModal.style.display = "none";
    }  
  } 


  return (
    <>
      <div className={styles.MainContainer}>
        <div>
          <UserSummary data={data} />
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
        setPrice={setPrice} 
        setCo2={setCo2} 
        handleFormSubmit={(e) => handleFormSubmit(
          e,
          name,
          co2,
          price,
          category,
          globalState.user.userId
        )}
      />
      <NewDonationForm/>
    </>
  );
};

export default HomePage;
