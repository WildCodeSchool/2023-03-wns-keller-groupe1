import { useState } from "react";
import NewCarbonDataForm from "../Form/NewCarbonDataForm";
import CreateCarbonData from "../../services/crateCarbonData";
import { useGlobalState } from "../../GlobalStateContext";
import styles from "./HomePage.module.css";
import UserSummary from "./UserSummary";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import StatsSection from "./StatsSection";
import CommunitySection from "./CommunitySection";

const HomePage = () => {
  const [name, setName] = useState<string|undefined>();
  const [category, setCategory] = useState<number|undefined>();
  const [price, setPrice] = useState<number|undefined>();
  const [co2, setCo2] = useState<number|undefined>();
  const { handleFormSubmit } = CreateCarbonData();
  const [globalState, setGlobalState] = useGlobalState();
  const { loading, error, data } = useUserCarbonData(globalState?.user?.userId);

  return (
    <>
      <div className={styles.MainContainer}>
        <div>
          <UserSummary data={data} />
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div style={{width: "49%", paddingTop: "30px"}}>
            <StatsSection data={data} />  
          </div>
          <div style={{width: "49%", paddingTop: "30px"}}>
            <CommunitySection/> 
          </div>
        </div>
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
    </>
  );
};

export default HomePage;
