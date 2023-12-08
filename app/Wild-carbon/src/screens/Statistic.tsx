import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useUserCarbonData, GET_USER } from "../services/getUserCarbonData";
import { ICarbonData } from "../interfaces/CarbonData";
import { useGlobalState } from "../../GlobalStateContext";
import { carbonDataStatic } from "../helpers/helper.js";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Palette from "../styles/Palette";
const Statistic: React.FC = () => {
  const {
    isLogged,
    user,
    isMonthChart,
    setIsMonthChart,
    isBarChart,
    setIsBarChart,
    dropdownOptions,
    setDropdownOptions,
    initialData,
    setInitialData,
    selectedValue,
    setSelectedValue,
    totalCo2,
    setTotalCo2,
  } = useGlobalState();
  const [globalState, setGlobalState] = useGlobalState();
  const userId = globalState.user.userId;

  const { loading, error, data, refetch } = useUserCarbonData(userId);
  const [currentMonthCarbon, setCurrentMonthCarbon] = useState<number>(0);
  const today = new Date();
  const currentMonthName = today.toLocaleString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (loading || error) return;

    const currentMonthData = data.filter((item: ICarbonData) => {
      const createdAt = new Date(item.createdAt);
      return (
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getFullYear() === today.getFullYear()
      );
    });

    const sumCurrentMonth = currentMonthData.reduce(
      (acc: number, item: ICarbonData) => acc + item.consumption,
      0
    );

    setCurrentMonthCarbon(parseFloat(sumCurrentMonth.toFixed(1)));
  }, [data, loading, error]);

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    fillShadowGradient: Palette.primary,
    fillShadowGradientOpacity: 1,
  };

  const barData = {
    labels: [
      "Votre consommation",
      "Émissions mensuelles FR",
      "Accord de Paris",
    ],
    datasets: [
      {
        data: [
          currentMonthCarbon,
          carbonDataStatic.emissions_CO2_mensuelles_fr,
          carbonDataStatic.emissions_CO2_accord_paris_mensuelles,
        ],
      },
    ],
  };

  const screenWidth = responsiveWidth(95);
  const chartHeight = responsiveHeight(55);

  return (
    <View style={styles.Container}>
      {loading ? (
        <Text>Chargement...</Text>
      ) : error ? (
        <Text>Erreur : {error.message}</Text>
      ) : (
        <>
          <Text style={styles.subtitle}>{currentMonthName}</Text>
          <View style={styles.ChartView}>
            <BarChart
              data={barData}
              width={screenWidth}
              height={chartHeight}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              fromZero={true}
              showBarTops={false}
              showValuesOnTopOfBars={true}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  subtitle: {
    marginTop: responsiveHeight(5),
    fontSize: 20,
  },
  ChartView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Statistic;
