import React from "react";
import Styles from "./CarbonExpenseList.module.css";
import numberlist from "../../assets/images/numberlist.png";

interface CarbonDataContainerProps {
  data: {
    title: string;
    categoryString: string;
    consumption: number;
    createdAt: string;
  };
  index: number;
}
interface YearlyData {
  [key: string]: CarbonDataContainerProps["data"][];
}

interface CarbonExpenseListProps {
  initialData: { [key: string]: YearlyData };
  selectedValue: string;
}

const CarbonDataContainer: React.FC<CarbonDataContainerProps> = ({
  data,
  index,
}) => {
  return (
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
      <div className={Styles.fiveContainer}>
        <p>{new Date(data.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

interface CarbonExpenseListProps {
  initialData: { [key: string]: YearlyData };
  selectedValue: string;
}

const CarbonExpenseList: React.FC<CarbonExpenseListProps> = ({
  initialData,
  selectedValue,
}) => {
  console.log("initialData", initialData);
  console.log("selectedValue", selectedValue);
  // Séparer les valeurs sélectionnées par un espace
  const selectedParts = selectedValue.split(" ");
  const selectedYear =
    selectedParts.length === 1 ? selectedParts[0] : selectedParts[1];
  const selectedMonth = selectedParts.length === 2 ? selectedParts[0] : null;

  const yearlyData: YearlyData | undefined = initialData[selectedYear];

  // Gérer le cas où seulement l'année est sélectionnée
  let filteredData: CarbonDataContainerProps["data"][];
  if (selectedMonth) {
    // Un mois spécifique a été sélectionné
    filteredData = yearlyData ? yearlyData[selectedMonth] || [] : [];
  } else {
    // Seulement l'année a été sélectionnée, rassembler toutes les données de l'année
    filteredData = yearlyData
      ? Object.values(yearlyData).flat() // Utiliser .flat() pour aplatir le tableau de tableaux
      : [];
  }
  console.log("filteredData", filteredData);
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
            <CarbonDataContainer key={index} data={dataItem} index={index} />
          )
        )}
      </div>
    </div>
  );
};

export default CarbonExpenseList;
