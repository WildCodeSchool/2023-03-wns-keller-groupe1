import React, { useEffect, useState, ChangeEvent } from "react";
import styles from "./ModalForm.module.css";
import { NewCarbonDataFormProps } from "../../interface/NewCarbonDataFormProps";
import CarbonResults from "./CarbonResult";

const NewCarbonDataForm = ({
  setName,
  setCategory,
  setPrice,
  setCo2,
  name,
  category,
  price,
  Co2,
  handleFormSubmit,
  query,
  setQuery
}: NewCarbonDataFormProps|any) => {
  const [results, setResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedData, setSelectedData] = useState<any>(null);


  const fetchAdemeApi = async () => {
    const response = await fetch(`https://data.ademe.fr/data-fair/api/v1/datasets/base-carboner/lines?q=${query}&q_mode=complete`);
    const responseJson = await response.json();
    setResults(responseJson.results);
    console.log(responseJson.results);
    
  }

  useEffect(() => {
    if (query.length > 0) {
      fetchAdemeApi(); 
    }
  }, [query]);

  const handleInputChange =
    (setStateFunc: React.Dispatch<React.SetStateAction<string | undefined>>) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setStateFunc(event.target.value);
    };

  const handleInputNumberChange =
    (setStateFunc: React.Dispatch<React.SetStateAction<number | undefined>>) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setStateFunc(Number(event.target.value));
    };
 
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    let matchingData: any = results.find(
      (item: any) =>
        `${item["Nom_base_français"]} ${item["Nom_attribut_français"]}` ===
        selectedValue
    );

    if (matchingData == null) {
      matchingData = results.find(
        (item: any) =>
          `${item["Nom_base_français"]} ` ===
          selectedValue
      );
    }

    setSelectedData(matchingData);

    if (matchingData != undefined) {
      const inputString = matchingData["Code_de_la_catégorie"];
      const separator = " > ";
      const stringParts = inputString.split(separator);
      const lastString = stringParts[stringParts.length - 1];
      setName(`${selectedValue}`)
      setCategory(lastString);
      setCo2(matchingData["Total_poste_non_décomposé"]);
    }
  };

  return (
    <>
      <div id="new-carbon-modal" className={styles.MainContainer}>
        <div className={styles.modalContainer}>
          <h1 className={styles.modalTitle}>Ajouter une dépense carbone</h1>
          <div className={styles.formContainer}>
            <div>
              <p className={styles.formTitle}>
                Rechercher une dépense carbone (WIP)
              </p>
              <input
                className={styles.formInputLogin}
                type="text"
                list="test-results"
                id="testinput"
                name="test"
                onChange={(e) => {setQuery(e.target.value); handleOptionChange(e); handleInputChange(setName)}}
                placeholder="Ex: Salade de riz"
                required
                value={query}
                autoComplete="off"
              />      
            </div>
            {query.length > 0 && <CarbonResults data={results} />}
            <div>
              <p className={styles.formTitle}>Catégorie de la dépense</p>
              <input
                className={styles.formInputLogin}
                name="category"
                id="category"
                type="text"
                placeholder="Catégorie"
                onChange={handleInputChange(setCategory)}
                required
                value={category}
              >
              </input>
            </div>
            <div>
              <p className={styles.formTitle}>Poid carbone en kg Co2 ?</p>
              <input
                className={styles.formInputLogin}
                type="number"
                name="co2"
                id="co2"
                onChange={handleInputNumberChange(setCo2)}
                required
                value={Co2}
              />
            </div>
            <div>
              <p className={styles.formTitle}>Prix</p>
              <input
                className={styles.formInputLogin}
                type="number"
                name="price"
                id="price"
                onChange={handleInputNumberChange(setPrice)}
                required
                value={price}
              />
            </div>
            <div className={styles.formGroupSubmit}>
              <button
                onClick={handleFormSubmit}
                className={styles.submitButton}
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCarbonDataForm;
