import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/chart";
import styles from "./Statistic.module.css";
import { useGlobalState } from "../../GlobalStateContext";
import { ICarbonData } from "../../interface/CarbonData";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import BarChart from "../../components/chart/VerticalBarChart";
import chart1Black from "../../assets/icons/chart1Black.png";
import chart2Black from "../../assets/icons/chart2Black.png";
import chart1White from "../../assets/icons/chart1White.png";
import chart2White from "../../assets/icons/chart2White.png";

const Statistic = () => {
  const [globalState, setGlobalState] = useGlobalState();
  const [LineChartSelected, setLineChartSelected] = useState<boolean>(false);
  const [OptionDateSelected, setOptionDateSelected] = useState<string>("mois");
  const { error, data } = useUserCarbonData(globalState?.user?.userId);
  const [months, setMonths] = useState<Array<{ month: string; year: string }>>(
    []
  );
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("fr-FR", { month: "long" });
    setCurrentMonth(month);
    setSelectedMonth(month);
  }, []);
  useEffect(() => {
    if (typeof data != "undefined" && loading === true) {
      const ticketsByMonthAndYear: { [monthAndYear: string]: ICarbonData[] } =
        {};
      data.forEach((ticket: ICarbonData) => {
        const createdAt = ticket.createdAt;
        const month = createdAt.toLocaleString("fr-FR", { month: "long" });
        const year = createdAt.getFullYear().toString();
        const monthAndYear = `${month} ${year}`;

        if (!ticketsByMonthAndYear[monthAndYear]) {
          ticketsByMonthAndYear[monthAndYear] = [];
        }

        ticketsByMonthAndYear[monthAndYear].push(ticket);
      });
      setMonths(
        Object.entries(ticketsByMonthAndYear).map(([monthAndYear]) => {
          const [month, year] = monthAndYear.split(" ");
          return { month, year };
        })
      );
      setLoading(false);
    }
  }, [data]);

  return (
    <div className={styles.MainContainer}>
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>Statistique</div>
        <div className={styles.chartOption}>
          <div className={styles.BtnList}>
            <button
              className={
                OptionDateSelected === "mois" ? styles.BtnSelected : styles.Btn
              }
              onClick={() => setOptionDateSelected("mois")}
            >
              Mois
            </button>
            <button
              className={
                OptionDateSelected === "Trimestre"
                  ? styles.BtnSelected
                  : styles.Btn
              }
              onClick={() => setOptionDateSelected("Trimestre")}
            >
              Trimestre
            </button>
            <button
              className={
                OptionDateSelected === "Année" ? styles.BtnSelected : styles.Btn
              }
              onClick={() => setOptionDateSelected("Année")}
            >
              Année
            </button>
          </div>
          <div className={styles.OptionListContainer}>
            <div className={styles.SelectChartDiv}>
              <button
                className={
                  LineChartSelected
                    ? styles.SelectChartBtn1
                    : styles.SelectChartBtn2
                }
                style={{ borderRadius: "15px 0 0 15px" }}
                onClick={() => setLineChartSelected(false)}
              >
                <p className={styles.SelectChartBtn1Text}>Barres</p>
                <img
                  src={LineChartSelected ? chart2White : chart2Black}
                  alt="chart2"
                  className={styles.chart}
                />
              </button>
              <button
                className={
                  LineChartSelected
                    ? styles.SelectChartBtn2
                    : styles.SelectChartBtn1
                }
                style={{ borderRadius: "0 15px 15px 0" }}
                onClick={() => setLineChartSelected(true)}
              >
                <p className={styles.SelectChartBtn1Text}>Linéaire</p>

                <img
                  src={LineChartSelected ? chart1Black : chart1White}
                  alt="chart1"
                  className={styles.chart}
                />
              </button>
            </div>
            <select
              className={styles.SelectMonth}
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
            >
              {months.map(({ month, year }) => (
                <option value={month}>
                  {month} {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.chartContent}>
          {data ? (
            LineChartSelected ? (
              <Chart
                data={{ data: data as ICarbonData[] }}
                selectedMonth={selectedMonth}
              />
            ) : (
              <BarChart data={{ data: data as ICarbonData[] }} />
            )
          ) : (
            <div>Chargement...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistic;
