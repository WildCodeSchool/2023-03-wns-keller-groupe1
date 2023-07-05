import React from "react";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as "top",
    },
  },
};

const labels = ["semaine 1", "semaine 2", "semaine 3", "semaine 4"];

const accordParisValue = 200;
const francaisMoyenValue = 500;

const data = {
  labels,
  datasets: [
    {
      label: "Vous",
      data: [0, 500, 750, 1200],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Accord de Paris",
      data: Array(labels.length).fill(accordParisValue),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      fill: false,
    },
    {
      label: "Français moyen",
      data: Array(labels.length).fill(francaisMoyenValue),
      borderColor: "rgb(53, 78, 5)",
      backgroundColor: "rgba(53, 162, 5, 0.5)",
      fill: false,
    },
  ],
};

const Chart = () => {
  return (
    <div
      style={{
        width: "70%",
        height: "60vh",
        display: "flex",
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
