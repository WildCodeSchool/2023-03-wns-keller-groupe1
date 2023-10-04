import { responsiveFontSize } from "react-native-responsive-dimensions";

const scaleFromFigma = (s) => responsiveFontSize(s / 7.6);

const FontsProps = {
  regular: (fontSize = 16, color = "#111111") => ({
    fontSize: scaleFromFigma(fontSize),
    fontFamily: "NotoSansJP-Regular",
    color: color,
  }),
  bold: (fontSize = 16, color = color || "#111111") => ({
    fontSize: scaleFromFigma(fontSize),
    fontFamily: "NotoSansJP-Bold",
    color: color,
  }),
  thin: (fontSize = 16, color = color || "#111111") => ({
    fontSize: scaleFromFigma(fontSize),
    fontFamily: "NotoSansJP-Thin",
    color: color,
  }),
};

export default FontsProps;
