import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Palette from "../styles/Palette";
import FontsProps from "../styles/fontProps";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const Button = ({
  title = "",
  style = {},
  onPress = () => {},
  titleStyle = {},
  disabled = false,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      style,
      disabled && { backgroundColor: Palette.disabled },
      !disabled && { backgroundColor: Palette.primary },
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[FontsProps.btnBig(), titleStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 20,
    width: responsiveWidth(80),
  },
  text: {},
});

export default Button;
