import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { carbonDataStatic } from "../../helper/helper";
import { ICarbonData } from "../../interface/CarbonData";
import { ChartBarProps } from "../../interface/ChartProps";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
);

const BarChart: React.FC<ChartBarProps> = ({ data }) => {
  const [dataByMonth, setDataByMonth] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const dataByMonthTemp: { [key: string]: number } = {};

    data.data.forEach((item: ICarbonData) => {
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
  }, []);

  const labels = Object.keys(dataByMonth);
  const userConsumptionData = Object.values(dataByMonth);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Moyenne des Français",
        data: Array(labels.length).fill(
          carbonDataStatic.emissions_CO2_mensuelles_fr
        ),
        backgroundColor: "rgb(28, 68, 142)",
        borderColor: "rgba(54, 162, 235,0.5)",
        borderWidth: 1,
      },
      {
        label: "Votre consommation",
        data: userConsumptionData,
        backgroundColor: "rgb(37, 165, 95)",
        borderColor: "rgba(37, 165, 95 ,0.5)",
        borderWidth: 1,
      },

      {
        label: "Objectif Accords de Paris",
        data: Array(labels.length).fill(
          carbonDataStatic.emissions_CO2_accord_paris_mensuelles
        ),
        backgroundColor: "rgb(175, 27, 63)",
        borderColor: "rgba(175, 27, 63,0.5)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as "top",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label;
            const value = context.parsed.y;
            return `${label}: ${value} kg / co2`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "70%", height: "60vh", display: "flex" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BarChart;
