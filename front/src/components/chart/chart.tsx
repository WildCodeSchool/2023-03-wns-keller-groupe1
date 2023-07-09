import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartProps } from "../../interface/ChartProps";
import { carbonDataStatic } from "../../helper/helper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart: React.FC<ChartProps> = ({
  data,
  selectedMonth,
  OptionMonthSelected,
  selectedYear,
}) => {
  const [dataByPeriod, setDataByPeriod] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    let totalConsumption = 0;
    const dataByPeriod: { [key: string]: number } = {};
    const sortedData = [...data.data].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    sortedData.forEach((item) => {
      const createdAt = item.createdAt;
      const period = OptionMonthSelected
        ? createdAt.toLocaleString("fr-FR", { day: "2-digit", month: "long" })
        : createdAt.toLocaleString("fr-FR", { month: "long" });

      totalConsumption += item.consumption;

      dataByPeriod[period] = totalConsumption;
    });

    setDataByPeriod(dataByPeriod);
  }, [data, OptionMonthSelected]);

  const labels = Object.keys(dataByPeriod);
  const userConsumptionData = Object.values(dataByPeriod);

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
        borderColor: "rgb(28, 68, 142)",
        backgroundColor: "rgba(28, 68, 142,0.5)",
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Votre consommation en kg de CO2",
        data: userConsumptionData,
        borderColor: "rgb(37, 165, 95)",
        backgroundColor: "rgba(37, 165, 95 ,0.5)",
        fill: false,
        pointRadius: 5,
      },
      {
        label: "Objectif Accords de Paris",
        data: Array(labels.length).fill(
          OptionMonthSelected
            ? carbonDataStatic.emissions_CO2_accord_paris_mensuelles
            : carbonDataStatic.emissions_CO2_accord_paris_mensuelles * 12
        ),
        borderColor: "rgb(175, 27, 63)",
        backgroundColor: "rgba(175, 27, 63,0.5)",
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
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
    <div
      style={{
        width: "70%",
        height: "60vh",
        display: "flex",
      }}
    >
      <Line options={options} data={chartData} />
    </div>
  );
};

export default Chart;
