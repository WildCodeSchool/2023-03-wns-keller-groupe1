import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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

interface DataItem {
  title: string;
  consumption: number;
  createdAt: string;
}

interface DataStructure {
  [key: string]: {
    [key: string]: DataItem[];
  };
}

interface ChartProps {
  initialData: DataStructure;
  selectedValue: string;
  isMonthChart: boolean;
  dropdownOptions: string[];
}

interface ChartDataFormat {
  name: string;
  consumption: number;
}

interface ChartDataSet {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  pointBackgroundColor?: string | string[];
}

interface ChartState {
  labels: string[];
  datasets: ChartDataSet[];
}

interface DailyConsumption {
  [key: string]: number;
}
const Chart: React.FC<ChartProps> = ({
  initialData,
  selectedValue,
  isMonthChart,
  dropdownOptions,
}) => {
  const [chartData, setChartData] = useState<ChartState>({
    labels: [],
    datasets: [
      {
        label: "Consommation CO2",
        data: [],
        backgroundColor: "rgb(37, 165, 95)",
        borderColor: "rgba(37, 165, 95 ,0.5)",
      },
    ],
  });

  function getMonthNumber(monthName: string) {
    const months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    return months.indexOf(monthName.toLowerCase()) + 1;
  }

  useEffect(() => {
    let newChartData: ChartState = {
      labels: [],
      datasets: [
        {
          label: "Consommation CO2",
          data: [],
          backgroundColor: "rgb(37, 165, 95)",
          borderColor: "rgba(37, 165, 95 ,0.5)",
        },
      ],
    };
    console.log("before : ", selectedValue, dropdownOptions, isMonthChart);
    if (isMonthChart) {
      const dailyConsumption: DailyConsumption = {};
      const dailyNames: { [key: string]: string[] } = {};
      const [month, year] = selectedValue.split(" ");

      const monthData = initialData[year]?.[month.toLowerCase()];
      if (monthData) {
        monthData.forEach((item) => {
          const day = new Date(item.createdAt).getDate().toString();
          if (!dailyConsumption[day]) {
            dailyConsumption[day] = 0;
            dailyNames[day] = [];
          }
          dailyConsumption[day] += item.consumption;
          dailyNames[day].push(item.title);
        });

        let cumulativeConsumption = 0;

        Object.keys(dailyConsumption)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .forEach((day) => {
            cumulativeConsumption += dailyConsumption[day];
            newChartData.labels.push(day);
            newChartData.datasets[0].data.push(cumulativeConsumption);
            newChartData.datasets[0].pointBackgroundColor =
              newChartData.datasets[0].data.map((value, index) => {
                const currentDay = newChartData.labels[index];
                const names = dailyNames[currentDay];
                return names.join(" + ");
              });
          });
      }
    } else {
      if (!isMonthChart) {
        let cumulativeConsumption = 0;
        const yearData = initialData[selectedValue];

        if (yearData) {
          const sortedMonths = Object.keys(yearData).sort((a, b) => {
            return getMonthNumber(a) - getMonthNumber(b);
          });

          sortedMonths.forEach((month) => {
            const monthlyTotal = yearData[month].reduce(
              (sum, item) => sum + item.consumption,
              0
            );
            cumulativeConsumption += monthlyTotal;
            newChartData.labels.push(month);
            newChartData.datasets[0].data.push(cumulativeConsumption);
          });
        }
      }
    }

    setChartData(newChartData);
  }, [initialData, isMonthChart, selectedValue]);
  const dailyNames: { [key: string]: string[] } = {};

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          afterLabel: function (context: any) {
            const day = context.label;
            const names = dailyNames[day];
            return names ? names.join(" + ") : "";
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Chart;
