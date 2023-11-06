import ProgressBar from "../../components/donation/ProgressBar";
import "./DonationPage.css";
import CreateDonation from "../../services/createDonation";

const DonationPage = () => {
  const { handleFormSubmit } = CreateDonation();
  return (
    <>
      <div className="MainContainer">
        <div className="donationContainer">
          <div className="header">
            <h1 className="mainTitle">Soutenez Wild Carbon</h1>
          </div>
          <div className="textContainer">
            <div className="summary">
              <p>
                Wild-Carbon est une application gratuite vous permettant de
                suivre votre empreinte carbone. Pour maintenir notre plateforme
                et continuer à développer de nouvelles fonctionnalités, nous
                avons besoin de votre soutien.
              </p>
            </div>
            <div className="summary">
              <p>
                Votre contribution financière, quel qu'en soit le montant,
                aidera à assurer la pérennité de Wild-Carbon et à intensifier
                notre combat contre le changement climatique.
              </p>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <ProgressBar />
          </div>
          <div className="buttonContainer">
            <div className="center">
              <button
                className="donateButton"
                onClick={() =>
                  handleFormSubmit(sessionStorage.getItem("user_id"))
                }
              >
                Contribuer au Projet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationPage;
