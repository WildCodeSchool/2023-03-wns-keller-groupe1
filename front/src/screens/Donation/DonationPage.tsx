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
            <h1 className="mainTitle">
              Création d'une forêt urbaine et humaine en France
            </h1>
          </div>
          <div className="textContainer">
            <div className="summary">
              <p>Le projet de création d'une forêt urbaine et humaine dans la région des Bouches-du-Rhône vise à promouvoir la biodiversité, lutter contre la pollution atmosphérique et sensibiliser la population à l'importance de la nature en créant une forêt dense et diversifiée dans un espace urbain vacant ou un parc existant.</p>
            </div>
            <div className="summary">
              <p>L'Office national des forêts (ONF) est un organisme public qui intervient dans différents lieux urbains pour répondre aux besoins de tous. Il s'occupe notamment de boisements et forêts urbaines, parcs et jardins publics, friches industrielles, délaissés urbains, ripisylves et zones humides ou encore corridors écologiques.</p>        
            </div>         
          </div>
          <div style={{width: "100%"}}>
            <ProgressBar/>
          </div>
          <div className="buttonContainer">
            <div className="center">
              <button className="donateButton" onClick={() => handleFormSubmit(sessionStorage.getItem("user_id"))}>
                Contribuer au Projet
              </button> 
            </div>      
          </div>               
        </div>
      </div>
    </>
  )
}

export default DonationPage;