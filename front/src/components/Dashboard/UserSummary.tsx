import React, { useState } from "react";
import styles from "./HomePage.module.css";
import { useUserCarbonData } from "../../services/getUserCarbonData";
import { useGlobalState } from "../../GlobalStateContext";
import { ICarbonData } from "../../interface/CarbonData";

const UserSummary = () => {
  const [globalState, setGlobalState] = useGlobalState();
  const { loading, error, data } = useUserCarbonData(globalState?.user?.userId);

  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  const currentDate = `${capitalizedMonth} ${year}`;

  const modal: any = document.getElementById("new-carbon-modal");

  const handleModal = () => {
    modal.style.display = "block";
  }


  return (
    <>
      <div className={styles.userSummaryContainer}>
        <h1 className={styles.title}>Dashboard</h1>
        <h4 className={styles.subtitle}>{currentDate}</h4>
        <div style={{overflowY: "scroll", height: "350px", marginTop: "20px"}}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Nom</th>
                <th>Catégorie</th>
                <th>Consommation KG/Co2</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>     
              {data && data.map((data: ICarbonData, index: string) => {
                const myDate = new Date(data.createdAt);
                const formattedDate = myDate.toLocaleDateString();
                return (
                  <tr key={index}>
                    <td className={styles.tableCell}>{data.title}</td>
                    <td>Category</td>
                    <td>{data.consumption}</td>
                    <td>{formattedDate}</td>
                  </tr>
                )
              })}         
            </tbody>
          </table>
        </div>
        <div className={styles.formGroupSubmit}>
          <button id="button-modal" className={styles.submitButton} onClick={() => handleModal()}>
            Ajouter une dépense
          </button>
        </div>
      </div>
    </>
  )
}

export default UserSummary;