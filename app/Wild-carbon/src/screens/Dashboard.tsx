import React, { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useUserCarbonData } from "../services/getUserCarbonData";
import { format, compareDesc } from "date-fns";
import { fr } from "date-fns/locale";
import Palette from "../styles/Palette";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontsProps from "../styles/fontProps";
import CarbonContainer from "../components/CarbonContainer";
import Button from "../components/Button";
import { carbonDataStatic } from "../helpers/helper";

const Dashboard: React.FC = () => {
  const route = useRoute();
  const userData = route.params ? route.params.userData : null;
  const { loading, error, data, refetch } = useUserCarbonData(
    userData ? userData.userId : undefined
  );

  const [dataByMonth, setDataByMonth] = useState({});

  useEffect(() => {
    if (data) {
      const sortedData = [...data].sort((a, b) =>
        compareDesc(new Date(a.createdAt), new Date(b.createdAt))
      );

      const groupedData = sortedData.reduce((acc, item) => {
        const monthYear = format(new Date(item.createdAt), "MMMM yyyy", {
          locale: fr,
        });
        if (!acc[monthYear]) {
          acc[monthYear] = 0;
        }
        acc[monthYear] += item.consumption;
        return acc;
      }, {});

      setDataByMonth(groupedData);
    }
  }, [data]);

  const refreshData = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      console.error(error);
    }
  }, [refetch]);

  const currentMonth = format(new Date(), "MMMM yyyy", { locale: fr });
  const currentMonthDataArray = data?.filter(
    (item) =>
      format(new Date(item.createdAt), "MMMM yyyy", { locale: fr }) ===
      currentMonth
  );
  const emissionPercentage =
    (dataByMonth[currentMonth] / carbonDataStatic.emissions_CO2_mensuelles_fr) *
    100;
  let backgroundColor;
  if (emissionPercentage >= 100) {
    backgroundColor = Palette.red[1];
  } else if (emissionPercentage >= 75) {
    backgroundColor = Palette.orange[1];
  } else {
    backgroundColor = Palette.primary;
  }
  return userData ? (
    <View style={styles.MainContainer}>
      <View style={[styles.HeaderContainer, { backgroundColor }]}>
        <Text style={[FontsProps.title(), styles.HeaderText]}>
          {currentMonth} -
          {` ${(dataByMonth[currentMonth] || 0).toFixed(1)} Kg CO2`}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.BodyContainer}>
        {currentMonthDataArray?.length ? (
          currentMonthDataArray
            .reverse()
            .map((item) => (
              <CarbonContainer
                key={item.id}
                title={item.title}
                modifiedAt={new Date(item.modifiedAt)}
                id={item.id}
                consumption={item.consumption.toFixed(1)}
              />
            ))
        ) : (
          <Text style={[FontsProps.subtitle()]}>
            Vous n'avez pas encore créé de dépenses carbone. Commencez dès
            maintenant !
          </Text>
        )}
      </ScrollView>
      <View style={styles.FooterContainer}>
        <Button
          title={"Ajouter une dépense"}
          onPress={() => {
            console.log("Button pressed"), 
            refreshData();
          }}
        />
      </View>
    </View>
  ) : (
    <Text>Chargement...</Text>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  HeaderContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(10),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  HeaderText: {},
  BodyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(15),
  },
  FooterContainer: {
    width: responsiveWidth(100),
    position: "absolute",
    bottom: responsiveHeight(5),
    marginLeft: responsiveWidth(10),
  },
});

export default Dashboard;
