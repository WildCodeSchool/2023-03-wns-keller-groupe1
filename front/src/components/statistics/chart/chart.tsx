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
}

interface ChartDataFormat {
  name: string;
  consumption: number;
}

interface ChartDataSet {
  label: string;
  data: number[]; // Assurez-vous que c'est bien un tableau de nombres
  borderColor: string;
  backgroundColor: string;
}

interface ChartState {
  labels: string[]; // Assurez-vous que c'est bien un tableau de strings
  datasets: ChartDataSet[];
}

const Chart: React.FC<ChartProps> = ({
  initialData,
  selectedValue,
  isMonthChart,
}) => {
  function calculateTotalConsumption(
    data: DataStructure,
    selectedValue: string
  ): number | ChartDataFormat[] {
    let totalConsumption = 0;
    let chartData: ChartDataFormat[] = [];

    // Si selectedValue est une année
    if (selectedValue.length === 4) {
      const year = selectedValue;
      for (let month in data[year]) {
        data[year][month].forEach((item) => {
          totalConsumption += item.consumption;
        });
      }
      return totalConsumption;
    }
    // Si selectedValue est un mois spécifique
    else {
      const [year, month] = selectedValue.split(" ");
      if (data[year] && data[year][month.toLowerCase()]) {
        data[year][month.toLowerCase()].forEach((item) => {
          chartData.push({ name: item.title, consumption: item.consumption });
        });
      }
      return selectedValue.length === 4 ? totalConsumption : chartData;
    }
  }

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

    if (isMonthChart) {
      // isMonthChart true, on extrait les données du mois sélectionné
      const [year, month] = selectedValue.split(" ");
      const monthData = initialData[year]?.[month.toLowerCase()];

      if (monthData) {
        monthData.forEach((item) => {
          newChartData.labels.push(item.title);
          newChartData.datasets[0].data.push(item.consumption);
        });
      }
    } else {
      let cumulativeConsumption = 0; // Pour stocker la consommation cumulée
      const yearData = initialData[selectedValue];

      if (yearData) {
        Object.entries(yearData)
          .sort()
          .forEach(([month, dataItems]) => {
            // Assurez-vous que les mois sont triés
            const monthlyTotal = dataItems.reduce(
              (sum, item) => sum + item.consumption,
              0
            );
            cumulativeConsumption += monthlyTotal; // Ajouter au total cumulatif
            newChartData.labels.push(month);
            newChartData.datasets[0].data.push(cumulativeConsumption);
          });
      }
    }

    setChartData(newChartData);
  }, [initialData, isMonthChart, selectedValue]);

  return <Line options={{ responsive: true }} data={chartData} />;
};

export default Chart;
