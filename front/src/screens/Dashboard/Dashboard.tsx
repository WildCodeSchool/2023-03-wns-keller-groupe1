import React, { useState, useEffect } from "react";
import Styles from "./Dashboard.module.css";
import Statistics from "../../components/statistics/Statistics";
import { useGlobalState } from "../../GlobalStateContext";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import { ICarbonData } from "../../interface/CarbonData";

interface ISortedData {
  [year: string]: {
    [month: string]: ICarbonData[];
  };
}

const Dashboard = () => {
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

  const userId = user?.userId;
  const { loading, error, data: userCarbonData } = useUserCarbonData(userId);

  const calculateTotalCo2 = (selected: string) => {
    let total = 0;
    if (isMonthChart && selected) {
      const [month, year] = selected.split(" ");
      const carbonDataForMonth = initialData[year]?.[month];
      if (carbonDataForMonth) {
        carbonDataForMonth.forEach((data: any) => {
          total += data.consumption;
        });
      }
    } else if (!isMonthChart && selected) {
      const carbonDataForYear = initialData[selected];
      if (carbonDataForYear) {
        Object.values(carbonDataForYear).forEach((monthData: any) => {
          monthData.forEach((data: any) => {
            total += data.consumption;
          });
        });
      }
    }
    setTotalCo2(total);
  };

  useEffect(() => {
    if (userCarbonData && userCarbonData.length > 0) {
      const sortedCarbonData = [...userCarbonData].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      const sortedData: ISortedData = {};
      const options: string[] = [];
      const yearsSet = new Set();
      let total = 0;

      sortedCarbonData.forEach((data) => {
        const date = new Date(data.createdAt);
        const year = date.getFullYear().toString();
        const month = date.toLocaleString("fr-FR", { month: "long" });

        if (!sortedData[year]) {
          sortedData[year] = {};
        }
        if (!sortedData[year][month]) {
          sortedData[year][month] = [];
          if (isMonthChart) {
            options.push(`${month} ${year}`);
          } else {
            if (!yearsSet.has(year)) {
              yearsSet.add(year);
              options.push(year);
            }
          }
        }
        sortedData[year][month].push(data);

        if (
          (isMonthChart && `${month} ${year}` === selectedValue) ||
          (!isMonthChart && year === selectedValue)
        ) {
          total += data.consumption;
        }
      });

      if (options.length > 0) {
        const selected = options[0];
        setSelectedValue(selected);
        calculateTotalCo2(selected);
      }

      setInitialData(sortedData);
      setDropdownOptions(options);
      setTotalCo2(total);
    }
  }, [userCarbonData, isMonthChart]);

  useEffect(() => {
    if (selectedValue) {
      calculateTotalCo2(selectedValue);
    }
    console.log(initialData, "initialData");
    console.log(selectedValue, "selectedValue");
  }, [selectedValue, isMonthChart]);

  return (
    <div className={Styles.Maincontainer}>
      <div className={Styles.MaincontainerLeft}>
        <Statistics
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          isMonthChart={isMonthChart}
          setIsMonthChart={setIsMonthChart}
          isBarChart={isBarChart}
          setIsBarChart={setIsBarChart}
          dropdownOptions={dropdownOptions}
          initialData={initialData}
          totalCo2={totalCo2}
        />
        <div className={Styles.containerCarbon}>containerCarbon</div>
      </div>
      <div className={Styles.containerSocial}>containerSocial</div>
    </div>
  );
};

export default Dashboard;
