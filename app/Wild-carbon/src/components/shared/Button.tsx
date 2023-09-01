import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Palette from "../../styles/Palette";
import FontsProps from "../../styles/fontProps";
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
  whiteBtn = false,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      style,
      whiteBtn && styles.whiteButton,
      disabled && { backgroundColor: Palette.disabled },
      !disabled && !whiteBtn && { backgroundColor: Palette.primary },
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text
      style={[
        FontsProps.btnBig(),
        titleStyle,
        whiteBtn && { color: Palette.primary },
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    borderRadius: 20,
    width: responsiveWidth(80),
  },
  text: {},
  whiteButton: {
    backgroundColor: "transparent",
    borderColor: Palette.primary,
    borderWidth: 1,
  },
});

export default Button;
