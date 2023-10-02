import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useGlobalState } from "../../GlobalStateContext";
import Palette from "../styles/Palette";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontsProps from "../styles/fontProps";

const Profil: React.FC = () => {
  const navigation = useNavigation();
  const [globalState] = useGlobalState();

  const handleUserInfo = () => {
    navigation.navigate("UserDetails");
  };

  const openURL = () => {
    const url =
      "https://stone-sky-e7.notion.site/Conditions-G-n-rales-d-Utilisation-de-l-application-Wild-carbon-b52b0dfa322c4bdb9e7334da9a014d17?pvs=4";
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Ne peut pas ouvrir l'URL: " + url);
      }
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token").then(() => {
        navigation.navigate("Login");
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <View style={styles.TopView}>
        <Text style={FontsProps.bold(21, Palette.primary)}>
          {globalState.user.firstname}
        </Text>
      </View>

      <View style={styles.MainContainer}>
        <TouchableOpacity
          onPress={handleUserInfo}
          style={styles.ProfilContainer}
        >
          <Text style={FontsProps.regular()}>MES INFORMATIONS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openURL} style={styles.ProfilContainer}>
          <Text style={FontsProps.regular()}>À PROPOS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.ProfilContainer}>
          <Text style={[FontsProps.regular(), { color: Palette.red[1] }]}>
            SE DÉCONNECTER
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  TopView: {
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  MainContainer: {
    paddingHorizontal: responsiveWidth(5),
  },
  ProfilContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    borderRadius: 6,
    borderColor: Palette.grey[1],
    borderWidth: 1,
    marginBottom: responsiveHeight(2),
  },
});

export default Profil;
