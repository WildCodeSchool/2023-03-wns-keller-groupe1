import { ICarbonData } from "../../interface/CarbonData";
import BarChart from "../chart/VerticalBarChart";
import styles from "./HomePage.module.css";

const StatsSection = ({data}: any) => {

  return (
    <>
      <div className={styles.userSummaryContainer}>
        <div style={{padding: "20px", backgroundColor: "#f6f6f6"}}>
          <h1 className={styles.title}>Statistiques</h1>
        </div>
        {data && 
          <div style={{padding: "20px"}}>
            <BarChart data={{ data: data as ICarbonData[] }} />
          </div>
        }
      </div>
    </>
  )
}

export default StatsSection;