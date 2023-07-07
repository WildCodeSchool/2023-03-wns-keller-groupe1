import { useState } from "react";
import NewCarbonDataForm from "../Form/NewCarbonDataForm";
import CreateCarbonData from "../../services/crateCarbonData";
import { useGlobalState } from "../../GlobalStateContext";
import styles from "./HomePage.module.css";
import UserSummary from "./UserSummary";

const HomePage = () => {
  const [name, setName] = useState<string|undefined>();
  const [category, setCategory] = useState<number|undefined>();
  const [price, setPrice] = useState<number|undefined>();
  const [co2, setCo2] = useState<number|undefined>();
  const { handleFormSubmit } = CreateCarbonData();
  const [globalState, setGlobalState] = useGlobalState();

  return (
    <>
      <div className={styles.MainContainer}>
        <div>
          <UserSummary/>
        </div>
        <div style={{width: "50%"}}>
          
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
