import React, { useEffect, useState } from "react";
import Styles from "./CarbonExpenseList.module.css";
import numberlist from "../../assets/images/numberlist.png";
import Button from "../shared/Button";
import FormAddCarbonData from "./FormAddCarbonData";
import CreateCarbonData from "../../services/createCarbonData";
import axios from "axios";
import { Type } from "react-toastify/dist/utils";
import arrowbot from "../../assets/images/arrowbot.png";
import DeleteCarbonData from "../../services/deleteCarbonData";

interface CarbonDataContainerProps {
  data: {
    title: string;
    categoryString: string;
    consumption: number;
    createdAt: string;
    id: number;
  };
  index: number;
  onDelete?: (id: number) => Promise<void>;
  setShowEditForm?: React.Dispatch<React.SetStateAction<boolean>>;
  setExpenseName?: React.Dispatch<React.SetStateAction<string>>;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
  setCarbonWeight?: React.Dispatch<React.SetStateAction<number>>;
  setSelectedDate?: React.Dispatch<React.SetStateAction<string>>;
  setUpdateCarbonDataId?: React.Dispatch<React.SetStateAction<number | null>>;
  setIsUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface YearlyData {
  [key: string]: CarbonDataContainerProps["data"][];
}

interface CarbonExpenseListProps {
  initialData: { [key: string]: YearlyData };
  selectedValue: string;
  userId?: number;
}

const CarbonDataContainer: React.FC<CarbonDataContainerProps> = ({
  data,
  index,
  onDelete,
  setShowEditForm,
  setExpenseName,
  setCategory,
  setCarbonWeight,
  setSelectedDate,
  setUpdateCarbonDataId,
  setIsUpdate,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const formatDateToISO = (dateStr: any) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className={Styles.MainCarbonDataContainer}>
      <div className={Styles.CarbonDataContainer}>
        <div className={Styles.firstContainer}>
          <p style={{ color: "#AAAAAA", fontSize: "20px" }}>{index + 1}</p>
        </div>
        <div className={Styles.secondContainer}>
          <p className={Styles.NameText}>{data.title}</p>
        </div>
        <div className={Styles.thirdContainer}>
          <p>{data.categoryString}</p>
        </div>
        <div className={Styles.fourContainer}>
          <p>{data.consumption}</p>
        </div>
        <div className={Styles.fiveContainer2}>
          <p>{new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
        <div className={Styles.sixContainer2} onClick={toggleOptions}>
          {!showOptions ? (
            <img src={arrowbot} alt="arrowbot" className={Styles.arrowbot} />
          ) : (
            <img src={arrowbot} alt="arrowbot" className={Styles.arrowbot2} />
          )}
        </div>
      </div>
      {showOptions && (
        <div className={Styles.CarbonDataContainerbot}>
          {data.id && (
            <>
              <p
                className={Styles.pMod}
                onClick={() => {
                  setIsUpdate && setIsUpdate(true);
                  setExpenseName && setExpenseName(data.title);
                  setCategory && setCategory(data.categoryString);
                  setCarbonWeight && setCarbonWeight(data.consumption);
                  setSelectedDate &&
                    setSelectedDate(formatDateToISO(data.createdAt));
                  setUpdateCarbonDataId && setUpdateCarbonDataId(data.id);
                  setShowEditForm && setShowEditForm(true);
                }}
              >
                Modifier
              </p>
              <p className={Styles.pSup} onClick={() => onDelete?.(data.id)}>
                Supprimer
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const CarbonExpenseList: React.FC<CarbonExpenseListProps> = ({
  initialData,
  selectedValue,
  userId,
}) => {
  const selectedParts = selectedValue.split(" ");
  const selectedYear =
    selectedParts.length === 1 ? selectedParts[0] : selectedParts[1];
  const selectedMonth = selectedParts.length === 2 ? selectedParts[0] : null;

  const yearlyData: YearlyData | undefined = initialData[selectedYear];

  let filteredData: CarbonDataContainerProps["data"][];
  if (selectedMonth) {
    filteredData = yearlyData ? yearlyData[selectedMonth] || [] : [];
  } else {
    filteredData = yearlyData ? Object.values(yearlyData).flat() : [];
  }

  const { handleFormSubmit, handleUpdateFormSubmit } = CreateCarbonData();
  const { handleFormSubmitDelete } = DeleteCarbonData();

  const [expenseName, setExpenseName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [carbonWeight, setCarbonWeight] = useState<number>(0);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [updateCarbonDataId, setUpdateCarbonDataId] = useState<number | null>(
    0
  );
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [apiResults, setApiResults] = useState<any[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const fetchAdemeApi = async () => {
    try {
      const response = await axios.get(
        `https://data.ademe.fr/data-fair/api/v1/datasets/base-carboner/lines?q=${expenseName}&q_mode=complete`
      );
      setApiResults(response.data.results);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  useEffect(() => {
    if (expenseName) {
      fetchAdemeApi();
    }
  }, [expenseName]);

  const handleAddExpenseClick = () => {
    if (!showEditForm) {
      setShowEditForm((prevShowEditForm) => !prevShowEditForm);
      return;
    }

    if (expenseName && category && carbonWeight > 0) {
      const selectedDateObject = new Date(
        selectedDate.split("/").reverse().join("-")
      );

      if (isUpdate && updateCarbonDataId) {
        handleUpdateFormSubmit(
          expenseName,
          carbonWeight,
          category,
          updateCarbonDataId,
          selectedDateObject.toISOString()
        ).catch(console.error);
      } else {
        handleFormSubmit(
          expenseName,
          carbonWeight,
          category,
          userId ?? null,
          selectedDateObject
        ).catch(console.error);
      }

      setExpenseName("");
      setCategory("");
      setCarbonWeight(0);
      setSelectedDate(
        new Date().toISOString().split("T")[0].split("-").reverse().join("/")
      );
      setShowEditForm(false);
      setIsUpdate(false);
    }
  };

  const isButtonDisabled = !expenseName || !category || carbonWeight <= 0;

  return (
    <div className={Styles.Maincontainer}>
      <div className={Styles.TopContainer}>
        <div className={Styles.firstContainer}>
          <img
            src={numberlist}
            alt="numberlist"
            className={Styles.numberlist}
          />
        </div>
        <div className={Styles.secondContainer}>
          <p>Nom</p>
        </div>
        <div className={Styles.thirdContainer}>
          <p>Catégorie</p>
        </div>
        <div className={Styles.fourContainer}>
          <p>KG/Co2</p>
        </div>
        <div className={Styles.fiveContainer}>
          <p>Date</p>
        </div>
      </div>
      <div className={Styles.Midcontainer}>
        {filteredData.map(
          (dataItem: CarbonDataContainerProps["data"], index: number) => (
            <CarbonDataContainer
              key={index}
              data={dataItem}
              index={index}
              onDelete={handleFormSubmitDelete}
              setShowEditForm={setShowEditForm}
              setExpenseName={setExpenseName}
              setCategory={setCategory}
              setCarbonWeight={setCarbonWeight}
              setSelectedDate={setSelectedDate}
              setUpdateCarbonDataId={setUpdateCarbonDataId}
              setIsUpdate={setIsUpdate}
            />
          )
        )}
      </div>
      {showEditForm && (
        <FormAddCarbonData
          userId={userId ?? 0}
          expenseName={expenseName}
          setExpenseName={setExpenseName}
          category={category}
          setCategory={setCategory}
          carbonWeight={carbonWeight}
          setCarbonWeight={setCarbonWeight}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleFormSubmit={handleFormSubmit}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          apiResults={apiResults}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />
      )}
      <div className={Styles.BottomContainer}>
        <Button
          text={showEditForm ? "Valider" : "Ajouter une dépense"}
          width="30%"
          onClick={() => handleAddExpenseClick()}
          disabled={showEditForm ? isButtonDisabled : false}
        />
      </div>
    </div>
  );
};

export default CarbonExpenseList;
