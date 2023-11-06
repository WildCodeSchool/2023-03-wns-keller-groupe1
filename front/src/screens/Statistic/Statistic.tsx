import React, { useEffect, useState, useMemo } from "react";
import Chart from "../../components/statistics/chart/chart";
import styles from "./Statistic.module.css";
import { useGlobalState } from "../../GlobalStateContext";
import { ICarbonData } from "../../interface/CarbonData";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import BarChart from "../../components/statistics/chart/VerticalBarChart";
import chart1Black from "../../assets/icons/chart1Black.png";
import chart2Black from "../../assets/icons/chart2Black.png";
import chart1White from "../../assets/icons/chart1White.png";
import chart2White from "../../assets/icons/chart2White.png";
import { getParsedUserId } from "../../utils/getParsedUserId";

const Statistic = () => {
  const {
    isLogged,
    user,
    isMonthChart,
    setIsMonthChart,
    isBarChart,
    setIsBarChart,
    dropdownOptions,
    setDropdownOptions,
    initialData,
    setInitialData,
    selectedValue,
    setSelectedValue,
    totalCo2,
    setTotalCo2,
  } = useGlobalState();

  const [LineChartSelected, setLineChartSelected] = useState<boolean>(false);
  const [OptionMonthSelected, setOptionMonthSelected] = useState<boolean>(true);
  const [months, setMonths] = useState<Array<{ month: string; year: string }>>(
    []
  );
  const [years, setYears] = useState<Array<string>>([]);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<string>("");

  const { error, data } = useUserCarbonData(getParsedUserId());

  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("fr-FR", { month: "long" });
    setCurrentMonth(month);
    setSelectedMonth(month);

    const currentYear = currentDate.getFullYear().toString();
    setSelectedYear(currentYear);
  }, []);

  useEffect(() => {
    if (typeof data != "undefined") {
      const ticketsByMonthAndYear: { [monthAndYear: string]: ICarbonData[] } =
        {};
      const uniqueYears: string[] = [];

      data.forEach((ticket: ICarbonData) => {
        const createdAt = ticket.createdAt;
        const month = createdAt.toLocaleString("fr-FR", { month: "long" });
        const year = createdAt.getFullYear().toString();

        if (!uniqueYears.includes(year)) {
          uniqueYears.push(year);
        }

        const monthAndYear = `${month} ${year}`;

        if (!ticketsByMonthAndYear[monthAndYear]) {
          ticketsByMonthAndYear[monthAndYear] = [];
        }

        ticketsByMonthAndYear[monthAndYear].push(ticket);
      });

      setYears(uniqueYears);

      setMonths(
        Object.entries(ticketsByMonthAndYear).map(([monthAndYear]) => {
          const [month, year] = monthAndYear.split(" ");
          return { month, year };
        })
      );
    }
  }, [data]);

  const filteredData = useMemo(() => {
    if (typeof data !== "undefined") {
      return OptionMonthSelected
        ? data.filter((ticket: ICarbonData) => {
            const month = ticket.createdAt.toLocaleString("fr-FR", {
              month: "long",
            });
            return month === selectedMonth;
          })
        : data.filter((ticket: ICarbonData) => {
            const year = ticket.createdAt.getFullYear().toString();
            return year === selectedYear;
          });
    } else {
      return [];
    }
  }, [data, OptionMonthSelected, selectedMonth, selectedYear]);
  return (
    <div className={styles.MainContainer}>
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>Statistique</div>
        <div className={styles.chartOption}>
          <div className={styles.BtnList}>
            <button
              className={OptionMonthSelected ? styles.BtnSelected : styles.Btn}
              onClick={() => setOptionMonthSelected(true)}
            >
              Mois
            </button>
            <button
              className={!OptionMonthSelected ? styles.BtnSelected : styles.Btn}
              onClick={() => setOptionMonthSelected(false)}
            >
              Année
            </button>
          </div>
          <div className={styles.OptionListContainer}>
            <select
              className={styles.SelectMonth}
              value={OptionMonthSelected ? selectedMonth : selectedYear}
              onChange={(event) =>
                OptionMonthSelected
                  ? setSelectedMonth(event.target.value)
                  : setSelectedYear(event.target.value)
              }
            >
              {OptionMonthSelected
                ? months.map(({ month, year }) => (
                    <option value={month}>
                      {month} {year}
                    </option>
                  ))
                : years.map((year) => <option value={year}>{year}</option>)}
            </select>
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
          </div>
        </div>
        <div className={styles.chartContent}>
          <div style={{ width: "70%", height: "60vh", display: "flex" }}>
            {typeof data != "undefined" ? (
              LineChartSelected ? (
                // <Chart
                //   data={{ data: filteredData as ICarbonData[] }}
                //   OptionMonthSelected={OptionMonthSelected}
                // />
                <></>
              ) : (
                // <BarChart
                //   data={{ data: filteredData as ICarbonData[] }}
                //   OptionMonthSelected={OptionMonthSelected}
                // />
                <></>
              )
            ) : (
              <div>Chargement...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
