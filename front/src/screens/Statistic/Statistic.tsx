import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/chart";
import styles from "./Statistic.module.css";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import { useGlobalState } from "../../GlobalStateContext";
import { ICarbonData } from "../../interface/CarbonData";
import angelRight from "../../assets/icons/angelRight.svg";
import angelLeft from "../../assets/icons/angelLeft.svg";

const Statistic = () => {
  const [globalState, setGlobalState] = useGlobalState();
  // const { loading, error, data } = useUserCarbonData(globalState?.user?.userId);
  const [months, setMonths] = useState<Array<{ month: string; year: string }>>([]);

  const [currentMonth, setCurrentMonth] = useState<string>("juillet");
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("fr-FR", { month: "long" });
    setCurrentMonth(month);
  }, []);

  const carbonDataArray = [
    {
      title: "Produit A",
      consumption: 984,
      price: 38.51,
      createdAt: new Date("Sat Jul 01 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit B",
      consumption: 857,
      price: 37.09,
      createdAt: new Date("Sun Jul 02 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit C",
      consumption: 257,
      price: 22.47,
      createdAt: new Date("Mon Jul 03 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit D",
      consumption: 239,
      price: 23.69,
      createdAt: new Date("Sat Jul 08 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit E",
      consumption: 969,
      price: 32.51,
      createdAt: new Date("Sun Jul 09 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit F",
      consumption: 858,
      price: 30.28,
      createdAt: new Date("Mon Jul 10 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit G",
      consumption: 774,
      price: 30.89,
      createdAt: new Date("Sat Jul 15 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit H",
      consumption: 658,
      price: 26.35,
      createdAt: new Date("Sun Jul 16 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit I",
      consumption: 287,
      price: 22.96,
      createdAt: new Date("Mon Jul 17 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit I2",
      consumption: 47,
      price: 224.96,
      createdAt: new Date("Mon Jul 17 2023 10:00:00 GMT+0200"),
    },
    {
      title: "Produit J",
      consumption: 905,
      price: 35.3,
      createdAt: new Date("Sat Jul 22 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit K",
      consumption: 161,
      price: 22.56,
      createdAt: new Date("Sun Jul 23 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit L",
      consumption: 276,
      price: 21.32,
      createdAt: new Date("Mon Jul 24 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit M",
      consumption: 989,
      price: 38.99,
      createdAt: new Date("Tue Jul 25 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit X",
      consumption: 500,
      price: 25.99,
      createdAt: new Date("Fri Jun 02 2023 00:00:00 GMT+0200"),
    },
    {
      title: "Produit Y",
      consumption: 700,
      price: 31.75,
      createdAt: new Date("Sat Jun 10 2023 00:00:00 GMT+0200"),
    },
  ];

  const data = carbonDataArray;
  useEffect(() => {
    if (data) {
      const ticketsByMonthAndYear: { [monthAndYear: string]: ICarbonData[] } =
        {};

      data.forEach((ticket: ICarbonData) => {
        const createdAt = new Date(ticket.createdAt);
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
    }
  }, []);

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
          <Chart
            data={{ data: carbonDataArray }}
            selectedMonth={selectedMonth}
            currentMonth={currentMonth}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
