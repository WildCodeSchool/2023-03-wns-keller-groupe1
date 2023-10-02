import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Palette from "../../styles/Palette";
import FontsProps from "../../styles/fontProps";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CarbonContainerProps } from "../../interfaces/CarbonContainerProps";
import DeleteCarbonData from "../../services/deleteCarbonData";

const CarbonContainer: React.FC<CarbonContainerProps> = ({
  title,
  modifiedAt,
  id,
  consumption,
  categoryString,
  refreshData,
  setShowDashboardForm,
  setExpenseName,
  setCategory,
  setCarbonWeight,
  setIsUpdating,
  setUpdatingExpenseId,
}) => {
  const [viewFull, setViewFull] = useState(false);
  const { handleFormSubmitDelete } = DeleteCarbonData();

  const handleDelete = async () => {
    await handleFormSubmitDelete(id);
    refreshData();
  };

  return (
    <TouchableOpacity
      style={styles.MainContainer}
      onPress={() => setViewFull(!viewFull)}
    >
      <View style={styles.TopView}>
        <View style={styles.LeftView}>
          <Text style={[FontsProps.bold(), styles.Text]}>
            {title.length > 22 && !viewFull
              ? `${title.slice(0, 22)}...`
              : title}
          </Text>
          <Text
            style={[FontsProps.regular(13), styles.Text, { marginLeft: 5 }]}
          >
            {format(modifiedAt, "d MMMM yyyy", { locale: fr })}
          </Text>
        </View>
        <View style={styles.RightView}>
          <Text
            style={[FontsProps.bold(), styles.Text]}
          >{`${consumption} Kg CO2`}</Text>
        </View>
      </View>
      {viewFull && (
        <View style={styles.BottomView}>
          <TouchableOpacity
            onPress={() => {
              setShowDashboardForm(true);
              setExpenseName(title);
              setCategory(categoryString);
              setCarbonWeight(consumption);
              setIsUpdating(true);
              setUpdatingExpenseId(id);
            }}
          >
            <Text
              style={[
                FontsProps.bold(),
                styles.Text,
                { color: Palette.primary, marginRight: responsiveWidth(5) },
              ]}
            >
              Modifier
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text
              style={[
                FontsProps.bold(),
                styles.Text,
                { color: Palette.red[1] },
              ]}
            >
              Supprimer
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    display: "flex",
    backgroundColor: Palette.grey[1],
    borderRadius: 20,
    width: responsiveWidth(90),
    padding: responsiveWidth(3),
    marginBottom: responsiveHeight(1),
  },
  TopView: {
    display: "flex",
    flexDirection: "row",
  },
  LeftView: {
    width: "70%",
    display: "flex",
    justifyContent: "center",
  },
  RightView: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
  },
  BottomView: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-end",
  },
  Text: {
    lineHeight: responsiveHeight(3),
  },
});

export default CarbonContainer;
