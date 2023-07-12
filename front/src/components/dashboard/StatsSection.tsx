import { ICarbonData } from "../../interface/CarbonData";
import styles from "../../screens/Dashboard/HomePage.module.css";
import BarChart from "../chart/VerticalBarChart";

const StatsSection = ({ data }: any) => {
  return (
    <>
      <div className={styles.userSummaryContainer}>
        <div style={{ padding: "20px", backgroundColor: "#f6f6f6" }}>
          <h1 className={styles.title}>Statistiques</h1>
        </div>
        {data && (
          <div
            style={{
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <BarChart
              data={{ data: data as ICarbonData[] }}
              OptionMonthSelected={true}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default StatsSection;
