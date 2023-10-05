import { ICarbonData } from "../../interface/CarbonData";
import styles from "../../screens/Dashboard/HomePage.module.css";
import BarChart from "../chart/VerticalBarChart";
import { useState, useEffect } from "react";

const StatsSection = ({ data }: any) => {
  console.log(data, "data");

  const [filteredData, setFilteredData] = useState<ICarbonData[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    console.log(currentMonth, "currentMonth");
    const newData = data.filter((item: ICarbonData) => {
      const createdAt = new Date(item.createdAt);
      console.log(createdAt.getMonth(), "createdAt.getMonth()");
      return (
        createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear
      );
    });

    setFilteredData(newData);
  }, [data]);

  console.log(filteredData.length, "filteredData");
  console.log(filteredData, "filteredData");
  return (
    <>
      <div className={styles.userSummaryContainer}>
        <div style={{ padding: "20px", backgroundColor: "#f6f6f6" }}>
          <h1 className={styles.title}>Statistiques</h1>
        </div>
        {filteredData.length > 1 ? (
          <div
            style={{
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <BarChart
              data={{ data: filteredData as ICarbonData[] }}
              OptionMonthSelected={true}
            />
          </div>
        ) : (
          <p style={{ marginLeft: 20 }}>
            Vous n'avez pas assez de données pour afficher les statistiques
          </p>
        )}
      </div>
    </>
  );
};

export default StatsSection;
