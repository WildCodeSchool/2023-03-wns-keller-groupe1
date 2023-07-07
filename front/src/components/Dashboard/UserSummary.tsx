import styles from "./HomePage.module.css";
import { ICarbonData } from "../../interface/CarbonData";
import trashRed from "../../assets/icons/trash-red.svg";
import DeleteCarbonData from "../../services/deleteCarbonData";

const UserSummary = ({ data }: any) => {
  const { handleFormSubmit } = DeleteCarbonData();

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
                    <td style={{textAlign: "center"}}>Category</td>
                    <td style={{textAlign: "center"}}>{data.consumption}</td>
                    <td style={{textAlign: "center"}}>{formattedDate}</td>
                    <td style={{textAlign: "center"}}>
                      <img 
                        src={trashRed} 
                        alt="trash can" 
                        style={{paddingTop: "6px", cursor: "pointer"}}
                        onClick={(e) => handleFormSubmit(data.id)}
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
    </>
  )
}

export default UserSummary;