import styles from "./ModalForm.module.css";
import CreateDonation from "../../services/createDonation";
import { useState, ChangeEvent } from "react";
import { useGlobalState } from "../../GlobalStateContext";

const NewDonationForm = ({}) => {
  const { handleFormSubmit } = CreateDonation();
  const [amount, setAmount] = useState<number>(1); 
  const [globalState, setGlobalState] = useGlobalState();

  const handleInputNumberChange =
  (setStateFunc: React.Dispatch<React.SetStateAction<number>>) =>
  (event: ChangeEvent<HTMLInputElement>): void => {
    setStateFunc(Number(event.target.value));
  };

  return (
    <>
      <div id="new-donation-modal" className={styles.MainContainer}>
        <div className={styles.modalContainer}>
          <h1 className={styles.modalTitle}>Création d'une forêt urbaine et humaine en France</h1>
          <div className={styles.formContainer}>
            <div>
              <h4>Description</h4>
              <p style={{color: "black"}}>Le projet consistera à sélectionner un site approprié dans la région des Bouches-du-Rhône, tel qu'un espace urbain vacant ou un parc existant, et à le transformer en une forêt dense et diversifiée.</p>
            </div>
            <div>
              <h4>Objectif</h4>
              <p style={{color: "black"}}>L'objectif de ce projet est de promouvoir la biodiversité, de lutter contre la pollution atmosphérique et de sensibiliser la population à l'importance de la nature en créant une forêt urbaine et humaine dans la région de Provence-Alpes-Côte d'Azur, plus précisément dans le département des Bouches-du-Rhône.</p>
            </div>
            <div>
              <p className={styles.formTitle}>
                Combien voulez-vous donner ?
              </p>
              <input
                className={styles.formInputLogin}
                type="number"
                name="donation"
                id="donation"
                placeholder="1"
                min="1"
                onChange={handleInputNumberChange(setAmount)}
                required
              />
            </div>
            <div className={styles.formGroupSubmit}>
              <button
                className={styles.submitButton}
                onClick={() => handleFormSubmit(globalState.user.userId, amount)}
              >
                Je contribue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewDonationForm;