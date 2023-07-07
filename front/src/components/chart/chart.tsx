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
import { ChartProps } from "../../interface/ChartProps";
import { frenchMonthToNumber } from "../../helper/helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart: React.FC<ChartProps> = ({ data, selectedMonth }) => {
  const selectedMonthNumber =
    frenchMonthToNumber[selectedMonth as keyof typeof frenchMonthToNumber];
  const filteredData = data?.data.filter(
    (item) => item?.createdAt.getMonth() === selectedMonthNumber
  );

  const labels = filteredData.map((item) => {
    const date = new Date(item.createdAt);
    return date.toLocaleString("fr-FR", { day: "2-digit", month: "short" });
  });

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
