import React, { useEffect, useState, useMemo } from "react";
import styles from "./Statistic.module.css";
import { useGlobalState } from "../../GlobalStateContext";
import Statistics from "../../components/statistics/Statistics";
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

  return (
    <div className={styles.MainContainer}>
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
    </div>
  );
};

export default Statistic;
