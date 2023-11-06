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
import { TextInput } from "react-native-gesture-handler";
import Button from "../components/shared/Button";
import { useUpdateUsers } from "../services/updateProfil";

const UserDetails: React.FC = () => {
  const navigation = useNavigation();
  const { updateUser } = useUpdateUsers();
  const {
    isLogged,
    user,
    isMonthChart,
    setIsMonthChart,
    isBarChart,
    setIsBarChart,
    dropdownOptions,
    setDropdownOptions,
    initialData,
    setInitialData,
    selectedValue,
    setSelectedValue,
    totalCo2,
    setTotalCo2,
  } = useGlobalState();

  const [isEditabled, setIsEditabled] = React.useState(false);
  const [lastname, setLastname] = React.useState(
    globalState?.user?.lastname || ""
  );
  const [firstname, setFirstname] = React.useState(
    globalState?.user?.firstname || ""
  );
  const [email, setEmail] = React.useState(globalState?.user?.email || "");

  const goBack = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    const updatedInfo = {
      lastname: lastname,
      firstname: firstname,
      email: email,
      userId: globalState?.user?.userId,
    };

    updateUser({
      variables: updatedInfo,
    });

    setIsEditabled(false);
    setGlobalState({ ...globalState, user: updatedInfo });
  };

  return (
    <>
      <StatusBar backgroundColor={Palette.green[4]} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
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

        <View style={styles.containerInput}>
          <Text style={FontsProps.thin(18, Palette.black)}>Nom</Text>
          <TextInput
            style={styles.TextInput}
            value={lastname}
            onChangeText={setLastname}
            editable={isEditabled}
          ></TextInput>
        </View>
        <View style={styles.containerInput}>
          <Text style={FontsProps.thin(18, Palette.black)}>Prénom</Text>
          <TextInput
            style={styles.TextInput}
            value={firstname}
            onChangeText={setFirstname}
            editable={isEditabled}
          ></TextInput>
        </View>
        <View style={styles.containerInput}>
          <Text style={FontsProps.thin(18, Palette.black)}>Email</Text>
          <TextInput
            style={styles.TextInput}
            value={email}
            onChangeText={setEmail}
            editable={isEditabled}
          ></TextInput>
        </View>
      </SafeAreaView>
      <Button
        title={isEditabled ? "Confirmer" : "Modifier"}
        onPress={() =>
          isEditabled ? handleConfirm() : setIsEditabled(!isEditabled)
        }
        style={{
          positon: "absolute",
          bottom: responsiveHeight(5),
          alignSelf: "center",
          height: responsiveHeight(7.5),
        }}
      />
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
  containerInput: {
    justifyContent: "space-around",
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
  },
  TextInput: {
    width: responsiveWidth(60),
    height: responsiveHeight(5),
    paddingLeft: responsiveWidth(2),
    borderRadius: 6,
    borderColor: Palette.grey[1],
    borderWidth: 1,
  },
});

export default UserDetails;
