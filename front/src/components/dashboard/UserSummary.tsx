import styles from "../../screens/Dashboard/HomePage.module.css";
import { ICarbonData } from "../../interface/CarbonData";
import trashRed from "../../assets/icons/trash-red.svg";
import DeleteCarbonData from "../../services/deleteCarbonData";
import { useEffect, useState } from "react";

const UserSummary = ({ data }: any) => {
  const { handleFormSubmit } = DeleteCarbonData();
  const [dataByMonth, setDataByMonth] = useState<{ [key: string]: number }>({});

  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  const currentDate = `${capitalizedMonth} ${year}`;

  const modal: any = document.getElementById("new-carbon-modal");
  const handleModal = () => {
    modal.style.display = "block";
  }

  useEffect(() => {
    const dataByMonthTemp: { [key: string]: number } = {};

    if (data != null) {
      data.forEach((item: ICarbonData) => {
        const createdAt = new Date(item.createdAt);
        const month = createdAt.toLocaleString("fr-FR", { month: "long" });
        const year = createdAt.getFullYear();
        const key = `${month} ${year}`;
  
        if (dataByMonthTemp[key]) {
          dataByMonthTemp[key] += item.consumption;
        } else {
          dataByMonthTemp[key] = item.consumption;
        }
      });
  
      const sortedDataByMonth = Object.entries(dataByMonthTemp)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
        .slice(0, 3)
        .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
  
      setDataByMonth(sortedDataByMonth);
    }
    
  }, [data]);

  const userConsumptionData = Number(Object.values(dataByMonth));

  return (
    <>
      <div className={styles.userSummaryContainer}>
        <div style={{display: "flex", justifyContent: "space-between", padding: "20px", backgroundColor: "#f6f6f6"}}>
          <h1 className={styles.title}>Dashboard</h1>
          <h2 className={styles.totalCo2}>{userConsumptionData.toFixed(2)} Kg Co2</h2>
        </div>
        <div style={{padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <h4 className={styles.subtitle}>{currentDate}</h4>
          <div className={styles.tableContainer}>
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
                {data && data.toReversed().map((data: ICarbonData, index: string) => {
                  const myDate = new Date(data.createdAt);
                  const formattedDate = myDate.toLocaleDateString();
                  return (
                    <tr key={index} style={{textAlign: "center"}}>
                      <td className={styles.tableCell} style={{textAlign: "start"}}>{data.title}</td>
                      <td className={styles.tableCell}>{data.categoryString}</td>
                      <td className={styles.co2Text}>{data.consumption.toFixed(2)}</td>
                      <td className={styles.tableCell}>{formattedDate}</td>
                      <td>
                        <img 
                          src={trashRed} 
                          alt="trash can" 
                          style={{paddingTop: "6px", cursor: "pointer"}}
                          onClick={() => handleFormSubmit(data.id)}
                        />
                      </td>
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
      </div>
    </>
  )
}

export default UserSummary;