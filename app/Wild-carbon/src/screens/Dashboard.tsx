import React, { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useUserCarbonData } from "../services/getUserCarbonData";
import { format, compareDesc } from "date-fns";
import { fr, tr } from "date-fns/locale";
import Palette from "../styles/Palette";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontsProps from "../styles/fontProps";
import CarbonContainer from "../components/container/CarbonContainer";
import Button from "../components/shared/Button";
import { carbonDataStatic } from "../helpers/helper";
import DashboardForm from "../components/form/DashboardForm";
import CreateCarbonData from "../services/createCarbonData";
import axios from "axios";

const Dashboard: React.FC = () => {
  const route = useRoute();
  const { handleFormSubmit, handleUpdateFormSubmit } = CreateCarbonData();
  const userData = route.params ? route.params.userData : null;
  const { loading, error, data, refetch } = useUserCarbonData(
    userData ? userData.userId : undefined
  );
  const [dataByMonth, setDataByMonth] = useState<Record<string, number>>({});
  const [showDashboardForm, setShowDashboardForm] = useState(false);

  const [expenseName, setExpenseName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [carbonWeight, setCarbonWeight] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatingExpenseId, setUpdatingExpenseId] = useState<number | null>(
    null
  );
  const [apiResults, setApiResults] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const sortedData = [...data].sort((a, b) =>
        compareDesc(new Date(a.createdAt), new Date(b.createdAt))
      );

      const groupedData = sortedData.reduce<Record<string, number>>(
        (acc, item) => {
          const monthYear = format(new Date(item.createdAt), "MMMM yyyy", {
            locale: fr,
          });
          if (!acc[monthYear]) {
            acc[monthYear] = 0;
          }
          acc[monthYear] += item.consumption;
          return acc;
        },
        {}
      );

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

  const createOrUpdateExpense = async () => {
    if (expenseName && category && carbonWeight && userData?.userId) {
      try {
        if (isUpdating && updatingExpenseId) {
          await handleUpdateFormSubmit(
            { preventDefault: () => {} } as any,
            expenseName,
            carbonWeight,
            category,
            updatingExpenseId
          );
        } else {
          await handleFormSubmit(
            { preventDefault: () => {} } as any,
            expenseName,
            carbonWeight,
            category,
            userData.userId
          );
        }
        resetState();
      } catch (error) {
        console.error("Erreur lors de l'opération", error);
      }
    } else {
      console.warn("Tous les champs sont requis.");
    }
  };

  const resetState = () => {
    setExpenseName("");
    setCategory("");
    setCarbonWeight(0);
    setShowDashboardForm(false);
    setIsUpdating(false);
    setUpdatingExpenseId(null);
  };

  const fetchAdemeApi = async () => {
    try {
      const response = await axios.get(
        `https://data.ademe.fr/data-fair/api/v1/datasets/base-carboner/lines?q=${expenseName}&q_mode=complete`
      );
      setApiResults(response.data.results);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  useEffect(() => {
    if (expenseName) {
      fetchAdemeApi();
    }
  }, [expenseName]);

  return !showDashboardForm ? (
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
                categoryString={item.categoryString}
                modifiedAt={new Date(item.modifiedAt)}
                id={item.id}
                consumption={Number(item.consumption.toFixed(1))}
                refreshData={refreshData}
                setShowDashboardForm={setShowDashboardForm}
                setExpenseName={setExpenseName}
                setCategory={setCategory}
                setCarbonWeight={setCarbonWeight}
                setIsUpdating={setIsUpdating}
                setUpdatingExpenseId={setUpdatingExpenseId}
              />
            ))
        ) : (
          <>
            <Text style={[FontsProps.subtitle(), styles.TextContainer]}>
              Vous n'avez pas encore créé de dépenses carbone.
            </Text>
            <Text style={[FontsProps.subtitle(), styles.TextContainer]}>
              Commencez dès maintenant !
            </Text>
          </>
        )}
      </ScrollView>
      <View style={styles.FooterContainer}>
        <Button
          title={"Ajouter une dépense"}
          onPress={() => {
            setShowDashboardForm(!showDashboardForm);
          }}
        />
      </View>
    </View>
  ) : (
    <DashboardForm
      setShowDashboardForm={setShowDashboardForm}
      showDashboardForm={showDashboardForm}
      setExpenseName={setExpenseName}
      ExpenseName={expenseName}
      setCategory={setCategory}
      Category={category}
      setCarbonWeight={setCarbonWeight}
      CarbonWeight={carbonWeight}
      createOrUpdateExpense={createOrUpdateExpense}
      resetState={resetState}
      apiResults={apiResults}
      setApiResults={setApiResults}
    />
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
  TextContainer: {
    width: responsiveWidth(80),
  },
  FooterContainer: {
    width: responsiveWidth(100),
    position: "absolute",
    bottom: responsiveHeight(5),
    marginLeft: responsiveWidth(10),
  },
});

export default Dashboard;
