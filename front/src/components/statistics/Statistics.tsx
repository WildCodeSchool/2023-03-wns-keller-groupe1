import { useState, useEffect } from "react";
import Styles from "./Statistics.module.css";
import BarChart from "./chart/VerticalBarChart";
import { ICarbonData } from "../../interface/CarbonData";

type StatisticsProps = {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  isMonthChart: boolean;
  setIsMonthChart: (value: boolean) => void;
  isBarChart: boolean;
  setIsBarChart: (value: boolean) => void;
  dropdownOptions: string[];
  initialData: any;
  totalCo2: number;
};

const Statistics: React.FC<StatisticsProps> = ({
  selectedValue,
  setSelectedValue,
  isMonthChart,
  setIsMonthChart,
  isBarChart,
  setIsBarChart,
  dropdownOptions,
  initialData,
  totalCo2,
}) => {
  const [formattedData, setFormattedData] = useState<ICarbonData[]>([]);

  return (
    <div className={Styles.Maincontainer}>
      <div className={Styles.Topcontainer}>
        <div className={Styles.ContainerStat}>
          <div className={Styles.ContainerStatleft}>
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className={Styles.customSelect}
            >
              {dropdownOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={Styles.ContainerStatright}>
            <p
              style={{
                color: "#E6E6E6",
                fontSize: 18,
                fontFamily: "Noto Sans JP",
                opacity: 0.7,
              }}
            >
              Total
            </p>
            <p
              style={{
                color: "#E6E6E6",
                fontSize: 24,
                fontFamily: "Noto Sans JP",
              }}
            >
              {totalCo2} KG CO2
            </p>
          </div>
        </div>
        <div className={Styles.ContainerPickerType}>
          <div className={Styles.ContainerPickerType2}>
            <button
              className={
                !isMonthChart
                  ? Styles.ButtonPickerType
                  : Styles.ButtonPickerTypeActive
              }
              onClick={() => setIsMonthChart(true)}
            >
              Mois
            </button>
            <button
              className={
                isMonthChart
                  ? Styles.ButtonPickerType
                  : Styles.ButtonPickerTypeActive
              }
              onClick={() => setIsMonthChart(false)}
            >
              An
            </button>
          </div>
        </div>
        <div className={Styles.ContainerPicker}>
          <div className={Styles.ContainerPickerType2}>
            <button
              className={
                !isBarChart
                  ? Styles.ButtonPickerType
                  : Styles.ButtonPickerTypeActive
              }
              onClick={() => setIsBarChart(true)}
            >
              Barre
            </button>
            <button
              className={
                isBarChart
                  ? Styles.ButtonPickerType
                  : Styles.ButtonPickerTypeActive
              }
              onClick={() => setIsBarChart(false)}
            >
              Linéaire
            </button>
          </div>
        </div>
      </div>
      <div className={Styles.Midcontainer}>
        {isBarChart ? (
          <BarChart
            data={totalCo2}
            OptionMonthSelected={isMonthChart}
            isMonthChart={isMonthChart}
            selectedValue={selectedValue}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Statistics;
