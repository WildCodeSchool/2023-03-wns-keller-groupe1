import React, { useEffect, useState } from "react";
import  Chart from "../../components/chart/chart";
import styles from "./Statistic.module.css";

const Statistic = () => {
  return (
    <div className={styles.MainContaineur}>
      <div className={styles.chartContaineur}>
        <div className={styles.chartTitle}>Statistique</div>
        <div className={styles.chartOption}>
          <div className={styles.BtnList}>
            <button className={styles.Btn}>Mois</button>
            <button className={styles.Btn}>Trimestre</button>
            <button className={styles.Btn}>Année</button>

          </div>
        </div>
        <div className={styles.chartContent}>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
