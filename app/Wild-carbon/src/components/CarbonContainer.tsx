import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Palette from "../styles/Palette";
import FontsProps from "../styles/fontProps";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CarbonContainerProps } from "../interfaces/CarbonContainerProps";

const CarbonContainer: React.FC<CarbonContainerProps> = ({
  title,
  modifiedAt,
  id,
  consumption,
}) => (
  <TouchableOpacity style={styles.MainContainer}>
    <View style={styles.LeftView}>
      <Text style={[FontsProps.bold(), styles.Text]}>
        {title.length > 20 ? `${title.slice(0, 20)}...` : title}
      </Text>
      <Text style={[FontsProps.regularSmall(), styles.Text, { marginLeft: 5 }]}>
        {format(modifiedAt, "d MMMM yyyy", { locale: fr })}
      </Text>
    </View>
    <View style={styles.RightView}>
      <Text
        style={[FontsProps.bold(), styles.Text]}
      >{`${consumption} Kg CO2`}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  MainContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Palette.grey[1],
    borderRadius: 20,
    width: responsiveWidth(90),
    padding: responsiveWidth(3),
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
  Text: {
    lineHeight: responsiveHeight(3),
  },
});

export default CarbonContainer;
