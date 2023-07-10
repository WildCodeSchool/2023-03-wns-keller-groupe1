import { useState } from "react";
import NewCarbonDataForm from "../../components/Form/NewCarbonDataForm";
import CreateCarbonData from "../../services/crateCarbonData";
import { useGlobalState } from "../../GlobalStateContext";
import styles from "./HomePage.module.css";
import UserSummary from "../../components/dashboard/UserSummary";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import StatsSection from "../../components/dashboard/StatsSection";
import CommunitySection from "../../components/dashboard/CommunitySection";
import NewDonationForm from "../../components/Form/NewDonationForm";

const HomePage = () => {
  const [name, setName] = useState<string|undefined>();
  const [category, setCategory] = useState<string|undefined>();
  const [price, setPrice] = useState<number|undefined>(0);
  const [co2, setCo2] = useState<number|undefined>(0);
  const [query, setQuery] = useState("");
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
        name={name}
        category={category}
        price={price}
        Co2={co2}
        handleFormSubmit={(e: any) => handleFormSubmit(
          e,
          name,
          co2,
          price,
          category,
          globalState.user.userId,
          setQuery,
          setCo2,
          setPrice,
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
