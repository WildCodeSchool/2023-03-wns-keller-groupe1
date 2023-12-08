import React, { useEffect, useState } from "react";
import numberlist from "../../assets/images/numberlist.png";
import Button from "../shared/Button";
import Styles from "./FormAddCarbonData.module.css";

interface FormAddCarbonDataProps {
  userId: number;
  expenseName: string;
  setExpenseName: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  carbonWeight: number;
  setCarbonWeight: React.Dispatch<React.SetStateAction<number>>;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  showEditForm: boolean;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  apiResults: any[];
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormSubmit: (
    name: string | undefined,
    co2: number | undefined,
    category: string | undefined,
    userId: number | null,
    selectedDate: Date
  ) => Promise<void>;
}

const FormAddCarbonData: React.FC<FormAddCarbonDataProps> = ({
  userId,
  expenseName,
  setExpenseName,
  category,
  setCategory,
  carbonWeight,
  setCarbonWeight,
  selectedDate,
  setSelectedDate,
  handleFormSubmit,
  showEditForm,
  setShowEditForm,
  apiResults,
  showSuggestions,
  setShowSuggestions,
}) => {
  console.log(apiResults);
  const handleExpenseNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpenseName(event.target.value);
  };
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleCarbonWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCarbonWeight(Number(event.target.value));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const selectSuggestion = (suggestion: any) => {
    const mainCategory = suggestion.Code_de_la_catégorie.split(" > ")[0];
    setExpenseName(suggestion.Nom_base_français);
    setCategory(mainCategory);
    setCarbonWeight(Number(suggestion.Total_poste_non_décomposé));
    setShowSuggestions(false);
  };

  return (
    <div className={Styles.FormAddCarbonDataContainer}>
      <div className={Styles.CarbonDataContainer}>
        <div className={Styles.firstContainer}></div>
        <div className={Styles.secondContainer}>
          <input
            type="text"
            placeholder="Nom"
            className={Styles.inputCarbon}
            value={expenseName}
            onChange={handleExpenseNameChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          />
          {showSuggestions && (
            <div className={Styles.suggestionsDropdown}>
              {apiResults.slice(0, 3).map((suggestion, index) => (
                <div
                  key={index}
                  className={Styles.suggestionItem}
                  onMouseDown={() => selectSuggestion(suggestion)}
                >
                  {suggestion.Nom_base_français}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={Styles.thirdContainer}>
          <input
            type="text"
            placeholder="Catégorie"
            className={Styles.inputCarbon}
            value={category}
            onChange={handleCategoryChange}
          />
        </div>
        <div className={Styles.fourContainer}>
          <input
            type="text"
            placeholder="Co2"
            className={Styles.inputCarbon}
            value={carbonWeight.toString()}
            onChange={handleCarbonWeightChange}
          />
        </div>
        <div className={Styles.fiveContainer}>
          <input
            type="date"
            className={Styles.inputCarbon}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FormAddCarbonData;
