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
  pointBackgroundColor?: string | string[]; // Ajouté ici
}

interface ChartState {
  labels: string[]; // Assurez-vous que c'est bien un tableau de strings
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
      const dailyNames: { [key: string]: string[] } = {}; // Pour stocker les noms des dépenses chaque jour
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
          dailyNames[day].push(item.title); // Ajouter le nom à la liste pour le jour
        });

        let cumulativeConsumption = 0; // Pour stocker la consommation cumulée
        Object.keys(dailyConsumption)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .forEach((day) => {
            cumulativeConsumption += dailyConsumption[day];
            newChartData.labels.push(day);
            newChartData.datasets[0].data.push(cumulativeConsumption);
            // Ajouter une étiquette avec les noms cumulés des dépenses pour le jour
            newChartData.datasets[0].pointBackgroundColor =
              newChartData.datasets[0].data.map((value, index) => {
                const currentDay = newChartData.labels[index];
                const names = dailyNames[currentDay];
                return names.join(" + ");
              });
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
  const dailyNames: { [key: string]: string[] } = {};

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          // Cette fonction est utilisée pour personnaliser le texte affiché dans le tooltip.
          // Vous pouvez l'ajuster pour afficher les informations que vous souhaitez.
          afterLabel: function (context: any) {
            // Vous pouvez remplacer `any` par le type correct si vous le connaissez.
            const day = context.label;
            const names = dailyNames[day]; // Assurez-vous que dailyNames est accessible dans cette portée
            return names ? names.join(" + ") : "";
          },
        },
      },
    },
    // ... Autres options
  };

  return <Line options={{ responsive: true }} data={chartData} />;
};

export default Chart;
