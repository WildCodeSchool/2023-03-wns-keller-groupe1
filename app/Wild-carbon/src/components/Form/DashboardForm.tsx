import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import Palette from "../../styles/Palette";
import FontsProps from "../../styles/fontProps";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Button from "../shared/Button";
import { DashboardFormProps } from "../../interfaces/DashboardFormProps";

const DashboardForm: React.FC<DashboardFormProps> = ({
  setShowDashboardForm,
  showDashboardForm,
  setExpenseName,
  ExpenseName,
  setCategory,
  Category,
  setCarbonWeight,
  CarbonWeight,
  createOrUpdateExpense,
  resetState,
}) => {
  const [step, setStep] = useState(1);

  const questions = [
    "Quel est le nom de votre dépense ?",
    "Quelle est la catégorie concernée ?",
    "Poid carbon en kg Co2 ?",
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      createOrUpdateExpense();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      resetState();
    }
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderContainer}>
        <Text style={[FontsProps.questionDashboard(), styles.HeaderText]}>
          {questions[step - 1]}
        </Text>
      </View>
      <View style={styles.BodyContainer}>
        <TextInput
          style={[styles.input, FontsProps.regularLarge()]}
          onChangeText={(text) =>
            step === 1
              ? setExpenseName(text)
              : step === 2
              ? setCategory(text)
              : setCarbonWeight(Number(text))
          }
          value={
            step === 1
              ? ExpenseName
              : step === 2
              ? Category
              : String(CarbonWeight)
          }
          keyboardType={step === 3 ? "numeric" : "default"}
        />
      </View>

      <View style={styles.FooterContainer}>
        <Button title={"SUIVANT"} onPress={handleNext} />
        <TouchableOpacity onPress={handleBack}>
          <Text style={[FontsProps.subtitle(), styles.subtitlebtn]}>
            {step === 1 ? "Annuler" : "Retour"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  HeaderContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(15),
    paddingHorizontal: responsiveWidth(5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  HeaderText: {
    textAlign: "center",
  },

  BodyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(45),
  },
  FooterContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(20),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitlebtn: {
    marginTop: responsiveHeight(2),
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Palette.black,
    width: responsiveWidth(70),
    paddingVertical: 0,
    paddingTop: responsiveHeight(1),
  },
});

export default DashboardForm;
