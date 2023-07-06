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
import { ICarbonDataArray } from "../../interface/CarbonData";

interface ChartProps {
  data: ICarbonDataArray;
  selectedMonth: string;
  currentMonth: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const frenchMonthToNumber = {
  janvier: 0,
  février: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  décembre: 11,
};
const Chart: React.FC<ChartProps> = ({ data, selectedMonth, currentMonth }) => {
  const selectedMonthNumber =
    frenchMonthToNumber[selectedMonth as keyof typeof frenchMonthToNumber];
  const filteredData = data.data.filter(
    (item) => item.createdAt.getMonth() === selectedMonthNumber
  );

  const labels = filteredData.map((item) =>
    item.createdAt.toLocaleString("fr-FR", { day: "2-digit", month: "short" })
  );

  let cumulativeCarbonConsumption = 0;
  const cumulativeConsumptionData = filteredData.map((item) => {
    cumulativeCarbonConsumption += item.consumption;
    return cumulativeCarbonConsumption;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Votre consommation en kg de CO2",
        data: cumulativeConsumptionData,
        borderColor: "rgb(37, 165, 95)",
        backgroundColor: " rgba(37, 165, 95 ,0.5)",
        pointRadius: 5,
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
            const index = context.dataIndex;
            const title =
              filteredData[index].title +
              " - " +
              filteredData[index].consumption +
              " kg / co2";
            return title;
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
