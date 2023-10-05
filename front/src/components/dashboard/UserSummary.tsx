import styles from "../../screens/Dashboard/HomePage.module.css";
import { ICarbonData } from "../../interface/CarbonData";
import trashRed from "../../assets/icons/trash-red.svg";
import update from "../../assets/icons/update.svg";
import DeleteCarbonData from "../../services/deleteCarbonData";
import { useEffect, useState } from "react";

const UserSummary = ({
  data,
  setQuery,
  setName,
  setCategory,
  setCo2,
  setUpdateCarbonDataId,
}: any) => {
  const { handleFormSubmitDelete } = DeleteCarbonData();
  const [dataByMonth, setDataByMonth] = useState<{
    [key: string]: ICarbonData[];
  }>({});

  const updateCarbonDataModal: any = document.getElementById(
    "update-carbon-modal"
  );

  const newCarbonDataModal: any = document.getElementById("new-carbon-modal");

  const handleModal = () => {
    newCarbonDataModal.style.display = "block";
  };

  const handleModalUpdate = (data: ICarbonData) => {
    updateCarbonDataModal.style.display = "block";
    setCategory(data.categoryString);
    setCo2(data.consumption);
    setQuery(data.title);
    setName(data.title);
    setUpdateCarbonDataId(data.id);
  };

  useEffect(() => {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const dataFilteredByMonth = data.filter((item: ICarbonData) => {
      const itemDate = new Date(item.createdAt);
      return (
        itemDate.getMonth() === currentMonth &&
        itemDate.getFullYear() === currentYear
      );
    });

    setDataByMonth({ [`${currentMonth}-${currentYear}`]: dataFilteredByMonth });
  }, [data]);

  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const currentDate = `${currentMonth}-${currentYear}`;

  const userConsumptionData = dataByMonth[currentDate] || [];

  const date2 = new Date();
  const month2 = date.toLocaleString("fr-FR", { month: "long" });
  const year2 = date.getFullYear();
  const currentDate2 = `${month2} ${year2}`;

  return (
    <>
      <div className={styles.userSummaryContainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            backgroundColor: "#f6f6f6",
          }}
        >
          <h1 className={styles.title}>Dashboard</h1>

          <h2 className={styles.totalCo2}>
            {userConsumptionData
              .reduce((total, item) => total + item.consumption, 0)
              .toFixed(2)}{" "}
            Kg Co2
          </h2>
        </div>
        <div
          style={{
            padding: "20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h4 className={styles.subtitle}>{currentDate2}</h4>
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
                {userConsumptionData.map((data: ICarbonData, index: number) => {
                  const myDate = new Date(data.createdAt);
                  const formattedDate = myDate.toLocaleDateString();
                  return (
                    <tr key={index} style={{ textAlign: "center" }}>
                      <td
                        className={styles.tableCell}
                        style={{ textAlign: "start" }}
                      >
                        {data.title}
                      </td>
                      <td className={styles.tableCell}>
                        {data.categoryString}
                      </td>
                      <td className={styles.co2Text}>
                        {data.consumption.toFixed(2)}
                      </td>
                      <td className={styles.tableCell}>{formattedDate}</td>
                      <td>
                        <img
                          src={update}
                          alt="update"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleModalUpdate(data)}
                        />
                        <img
                          src={trashRed}
                          alt="trash can"
                          style={{
                            paddingBottom: "3px",
                            paddingLeft: "6px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleFormSubmitDelete(data.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.formGroupSubmit}>
            <button
              id="button-modal"
              className={styles.submitButton}
              onClick={() => handleModal()}
            >
              Ajouter une dépense
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSummary;
