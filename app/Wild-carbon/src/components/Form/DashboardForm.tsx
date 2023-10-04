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
import DateTimePicker from "@react-native-community/datetimepicker";

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
  apiResults,
  setApiResults,
  selectedDate,
  setSelectedDate,
}) => {
  const [step, setStep] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const questions = [
    "Quel est le nom de votre dépense ?",
    "Quelle est la catégorie concernée ?",
    "Sélectionnez la date ?",
    "Poid carbon en kg Co2 ?",
  ];

  const handleNext = () => {
    if (step < 4) {
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

  const getLastCategory = (categoryString) => {
    const parts = categoryString.split(">");
    return parts[parts.length - 1].trim();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderContainer}>
        <Text
          style={[FontsProps.bold(22, Palette.green[4]), styles.HeaderText]}
        >
          {questions[step - 1]}
        </Text>
      </View>
      <View style={styles.BodyContainer}>
        {step !== 3 && (
          <TextInput
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.input,
              FontsProps.regular(19),
              isFocused ? styles.focusedInput : {},
            ]}
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
        )}

        {step === 1 && (
          <View style={styles.suggestionsContainer}>
            {apiResults?.slice(0, 6).map((suggestion, index) => (
              <TouchableOpacity
                style={styles.suggestionTouchable}
                key={index}
                onPress={() => {
                  let finalExpenseName = "";
                  if (suggestion.Nom_base_français) {
                    finalExpenseName += suggestion.Nom_base_français;
                  }
                  if (suggestion.Nom_attribut_français) {
                    finalExpenseName +=
                      " - " + suggestion.Nom_attribut_français;
                  }

                  setExpenseName(finalExpenseName);
                  setCategory(getLastCategory(suggestion.Code_de_la_catégorie));
                  setCarbonWeight(Number(suggestion.Total_poste_non_décomposé));
                  setApiResults([]);
                }}
              >
                <Text style={[styles.suggrstionText, FontsProps.regular()]}>
                  {suggestion.Nom_base_français || ""}{" "}
                  {suggestion.Nom_base_français &&
                  suggestion.Nom_attribut_français
                    ? "- "
                    : ""}
                  {suggestion.Nom_attribut_français || ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {step === 3 && (
          <>
            <TextInput
              onFocus={() => setShowDatePicker(true)}
              value={selectedDate.toLocaleDateString("fr-FR")}
              style={[
                styles.input2,
                FontsProps.regular(19),
                isFocused ? styles.focusedInput : {},
              ]}
            />
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode={"date"}
                display="default"
                onChange={onChangeDate}
              />
            )}
          </>
        )}
      </View>
      <View style={styles.FooterContainer}>
        <Button title={"SUIVANT"} onPress={handleNext} />
        <TouchableOpacity onPress={handleBack}>
          <Text
            style={[
              FontsProps.bold(18, Palette.text.green),
              styles.subtitlebtn,
            ]}
          >
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
  input2: {
    borderBottomWidth: 1,
    borderBottomColor: Palette.black,
    width: responsiveWidth(70),
    paddingVertical: 0,
    paddingTop: responsiveHeight(1),
    textAlign: "center",
  },
  suggestionsContainer: {
    width: responsiveWidth(70),
    maxHeight: responsiveHeight(20),
  },
  suggestionTouchable: {
    height: responsiveHeight(5),
    marginVertical: responsiveWidth(0.5),
    display: "flex",
    justifyContent: "center",
  },
  suggrstionText: {
    marginLeft: responsiveWidth(2),
  },
  focusedInput: {
    borderBottomColor: "#2ECF77",
  },
});

export default DashboardForm;
