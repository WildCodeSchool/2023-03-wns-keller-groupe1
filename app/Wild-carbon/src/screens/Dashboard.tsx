import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
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

const Dashboard: React.FC = () => {
  const route = useRoute();
  const userData = route.params ? route.params.userData : null;
  const { loading, error, data } = useUserCarbonData(
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

  const currentMonth = format(new Date(), "MMMM yyyy", { locale: fr });
  const currentMonthDataArray = data?.filter(
    (item) =>
      format(new Date(item.createdAt), "MMMM yyyy", { locale: fr }) ===
      currentMonth
  );

  return userData ? (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderContainer}>
        <Text style={[FontsProps.title(), styles.HeaderText]}>
          {currentMonth}
        </Text>
        <Text style={[FontsProps.title(), styles.HeaderText]}>
          {`${dataByMonth[currentMonth] || 0} Kg CO2`}
        </Text>
      </View>
      <View style={styles.BodyContainer}>
        {currentMonthDataArray?.length ? (
          currentMonthDataArray.map((item) => (
            <CarbonContainer
              key={item.id}
              title={item.title}
              modifiedAt={new Date(item.modifiedAt)}
              id={item.id}
              consumption={item.consumption}
            />
          ))
        ) : (
          <Text style={[FontsProps.subtitle()]}>
            Vous n'avez pas encore créé de dépenses carbone. Commencez dès
            maintenant !
          </Text>
        )}
      </View>
      <View style={styles.FooterContainer}>
        <Button
          title={"Ajouter une dépense"}
          onPress={() => {
            console.log("Button pressed");
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
    height: responsiveHeight(20),
    backgroundColor: Palette.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  HeaderText: {
    lineHeight: responsiveHeight(7),
  },
  BodyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: responsiveHeight(3),
  },
  FooterContainer: {
    width: responsiveWidth(100),
    position: "absolute",
    bottom: responsiveHeight(5),
    marginLeft: responsiveWidth(10),
  },
});

export default Dashboard;
