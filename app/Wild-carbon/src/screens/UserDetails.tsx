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
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { ArrowLeft } from "../assets/index";

const UserDetails: React.FC = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar backgroundColor={Palette.green[4]} barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.TopView}>
          <Text style={styles.headerTitleStyle}>Profil</Text>
        </View>
        <View style={styles.headerView}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => goBack()}>
            <ArrowLeft width="24" height="24" color={Palette.primary} />
          </TouchableOpacity>
          <Text style={FontsProps.bold(21, Palette.primary)}>
            Mes informations
          </Text>
        </View>

        <Text>UserDetails</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  TopView: {
    backgroundColor: Palette.green[4],
    height: responsiveHeight(10),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleStyle: {
    color: Palette.white,
    fontSize: responsiveWidth(6),
    fontFamily: "NotoSansJP-Bold",
  },
  headerView: {
    display: "flex",
    width: responsiveWidth(100),
    height: responsiveHeight(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    position: "absolute",
    left: responsiveWidth(10),
  },
});

export default UserDetails;
