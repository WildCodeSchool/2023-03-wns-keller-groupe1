import { ICarbonData } from "../../interface/CarbonData";
import BarChart from "../chart/VerticalBarChart";
import styles from "./HomePage.module.css";

const StatsSection = ({data}: any) => {

  return (
    <>
      <div className={styles.userSummaryContainer}>
        <h1 className={styles.title}>Statistiques</h1>
        {data && 
          <div style={{marginTop: "10px"}}>
            <BarChart data={{ data: data as ICarbonData[] }} />
          </div>
        }
      </div>
    </>
  )
}

export default StatsSection;