import { responsiveFontSize } from "react-native-responsive-dimensions";

const scaleFromFigma = (s) => responsiveFontSize(s / 7.6);

const FontsProps = {
  regular: (fontSize = 16) => ({
    fontSize: scaleFromFigma(fontSize),
    fontFamily: "NotoSansJP-Regular",
    color: "#111111",
  }),
  regularLarge: (fontSize = 19) => ({
    fontSize: scaleFromFigma(fontSize),
    fontFamily: "NotoSansJP-Regular",
    color: "#111111",
  }),
  title: (fontSize = 36) => ({
    fontSize: scaleFromFigma(fontSize),
    fontFamily: "NotoSansJP-Bold",
    color: "#E6E6E6",
  }),
  subtitle: (fontSize = 18) => ({
    fontSize: scaleFromFigma(fontSize),
    fontFamily: "NotoSansJP-Bold",
    color: "#1C7B47",
  }),
  btnBig: (fontSize = 18) => ({
    fontSize: scaleFromFigma(fontSize),
    fontFamily: "NotoSansJP-Bold",
    color: "#E6E6E6",
  }),
  btnSmall: (fontSize = 18) => ({
    fontSize: scaleFromFigma(fontSize),
    fontFamily: "NotoSansJP-Regular",
    color: "#E6E6E6",
  }),
  subtitleLogin: (fontSize = 21) => ({
    fontSize: scaleFromFigma(fontSize),
    fontFamily: "NotoSansJP-Bold",
    color: "#25A55F",
  }),
};

export default FontsProps;
