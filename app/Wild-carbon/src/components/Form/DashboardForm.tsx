import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Palette from "../../styles/Palette";
import FontsProps from "../../styles/fontProps";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Button from "../shared/Button";

interface DashboardFormProps {
  setShowDashboardForm: React.Dispatch<React.SetStateAction<boolean>>;
  showDashboardForm: boolean;
}

const DashboardForm: React.FC<DashboardFormProps> = ({
  setShowDashboardForm,
  showDashboardForm,
}) => {
  const [step, setStep] = useState(1);

  const questions = [
    "Quel est le nom de votre dépense ?",
    "Sélectionnez la date ?",
    "Quelle est la catégorie concernée ?",
    "Poid carbon en kg Co2 ?",
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log("Finit");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setShowDashboardForm(!showDashboardForm);
    }
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderContainer}>
        <Text style={[FontsProps.questionDashboard(), styles.HeaderText]}>
          {questions[step - 1]}
        </Text>
      </View>
      <View style={styles.BodyContainer}></View>

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
    backgroundColor: "pink",
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
});

export default DashboardForm;
