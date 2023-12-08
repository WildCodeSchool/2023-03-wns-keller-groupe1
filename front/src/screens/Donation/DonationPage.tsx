import React, { useEffect, useState } from "react";
import Styles from "./DonationPage.module.css";
import CreateDonation from "../../services/createDonation";
import { useGetAllDonation } from "../../services/getAllDonation";
import LogoGreen from "../../assets/images/LogoGreen.png";
import Button from "../../components/shared/Button";

const DonationPage = () => {
  const [donation, setDonation] = useState<number>(0);

  const { data } = useGetAllDonation();
  const { handleFormSubmit } = CreateDonation();

  useEffect(() => {
    let totalDonations = 0;

    if (data) {
      data.getAllDonation.forEach((element: { amount: number }) => {
        totalDonations = totalDonations + element.amount / 100;
        setDonation(totalDonations);
      });
    }
  }, [data]);
  return (
    <>
      <div className={Styles.MainContainer}>
        <div className={Styles.BackgroundContainer}>
          <div className={Styles.TopContainer}>
            <div className={Styles.TopContainer1}>
              <div className={Styles.TopContainer2}>
                <p className={Styles.Total}>{donation} €</p>
              </div>
            </div>

            <div className={Styles.ImageContainer}>
              <img
                src={LogoGreen}
                alt="logoGreen"
                className={Styles.logoGreen2}
              />
            </div>
          </div>
          <div className={Styles.MidContainer}>
            <p className={Styles.Title}>
              Wild-Carbon est une application gratuite vous permettant de suivre
              votre empreinte carbone. Pour maintenir notre plateforme et
              continuer à développer de nouvelles fonctionnalités, nous avons
              besoin de votre soutien.
              <br /> <br /> Votre contribution financière, quel qu'en soit le
              montant, aidera à assurer la pérennité de Wild-Carbon et à
              intensifier notre combat contre le changement climatique.
            </p>
          </div>

          <div className={Styles.BottomContainer}>
            <Button
              text="Contribuer au Projet"
              width="20%"
              height="50px"
              onClick={() =>
                handleFormSubmit(sessionStorage.getItem("user_id"))
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationPage;
