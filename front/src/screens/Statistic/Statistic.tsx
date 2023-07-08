import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/chart";
import styles from "./Statistic.module.css";
import { useGlobalState } from "../../GlobalStateContext";
import { ICarbonData } from "../../interface/CarbonData";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import BarChart from "../../components/chart/VerticalBarChart";

const Statistic = () => {
  const [globalState, setGlobalState] = useGlobalState();
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
            <button className={styles.Btn}>Mois</button>
            <button className={styles.Btn}>Trimestre</button>
            <button className={styles.Btn}>Année</button>
          </div>
          <div className={styles.SelectMonthContainer}>
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
            <Chart
              data={{ data: data as ICarbonData[] }}
              selectedMonth={selectedMonth}
            />
          ) : (
            //<BarChart data={{ data: data as ICarbonData[] }} />
            <div>Chargement...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistic;
