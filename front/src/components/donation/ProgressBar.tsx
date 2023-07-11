import React, { useEffect, useState } from 'react';
import "./ProgressBar.css";
import { gql, useQuery } from "@apollo/client";

export const GET_ALL_DONATION = gql`
  query GetAllDonation {
    getAllDonation {
      amount
      created_at
      Id
    }
  }
`;

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [donation, setDonation] = useState<number>(0);

  const { loading, error, data } = useQuery(GET_ALL_DONATION, {
    fetchPolicy: "network-only",
  })

  useEffect(() => {
    let totalDonations = 0;
    
    if (data) {
      data.getAllDonation.forEach((element: any) => {
        totalDonations = totalDonations + (element.amount/100) 
        setDonation(totalDonations)
      });
    }

    function getPercent(x: number, y: number) {
      return (x / y) * 100;
    }
    
    const getProgress = () => {
      const calculatedProgress = getPercent(totalDonations, 10000);
      setProgress(calculatedProgress);
    };
    
    getProgress();

  }, [data]);

  return (
    <div className="container">
      <h2>Objectif: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(donation)} / 10 000€</h2>
      <div className="progressbar-container">
        <div className="progressbar-complete" style={{ width: `${progress}%` }}>
          <div className="progressbar-liquid"></div>
        </div>
        <span className="progress">{new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 3 }).format(progress)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
