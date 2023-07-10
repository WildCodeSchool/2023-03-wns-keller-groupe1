import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { carbonDataStatic } from "../../helper/helper";
import { ICarbonData } from "../../interface/CarbonData";
import { ChartProps } from "../../interface/ChartProps";
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

const BarChart: React.FC<ChartProps> = ({
  data,
  OptionMonthSelected,
}) => {
  const [dataByMonth, setDataByMonth] = useState<{ [key: string]: number }>({});
  const [dataByYear, setDataByYear] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const dataByPeriod: { [key: string]: number } = {};

    data.data.forEach((item: ICarbonData) => {
      const createdAt = item.createdAt;
      const period = OptionMonthSelected
        ? createdAt.toLocaleString("fr-FR", { month: "long" })
        : createdAt.getFullYear().toString();

      if (!dataByPeriod[period]) {
        dataByPeriod[period] = 0;
      }
      dataByPeriod[period] += item.consumption;
    });

    if (OptionMonthSelected) {
      setDataByMonth(dataByPeriod);
    } else {
      setDataByYear(dataByPeriod);
    }
  }, [data, OptionMonthSelected]);

  const labels = Object.keys(OptionMonthSelected ? dataByMonth : dataByYear);
  const userConsumptionData = Object.values(
    OptionMonthSelected ? dataByMonth : dataByYear
  );
  const chartData = {
    labels,
    datasets: [
      {
        label: "Moyenne des Français",
        data: Array(labels.length).fill(
          OptionMonthSelected
            ? carbonDataStatic.emissions_CO2_mensuelles_fr
            : carbonDataStatic.emissions_CO2_mensuelles_fr * 12
        ),
        backgroundColor: "rgb(28, 68, 142)",
        borderColor: "rgba(54, 162, 235,0.5)",
        borderWidth: 1,
      },
      {
        label: "Votre consommation en kg de CO2",
        data: userConsumptionData,
        backgroundColor: "rgb(37, 165, 95)",
        borderColor: "rgba(37, 165, 95 ,0.5)",
        borderWidth: 1,
      },
      {
        label: "Objectif Accords de Paris",
        data: Array(labels.length).fill(
          OptionMonthSelected
            ? carbonDataStatic.emissions_CO2_accord_paris_mensuelles
            : carbonDataStatic.emissions_CO2_accord_paris_mensuelles * 12
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