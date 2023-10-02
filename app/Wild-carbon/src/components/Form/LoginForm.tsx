import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import FontsProps from "../../styles/fontProps";
import { CheckIcon } from "../../assets/index";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Palette from "../../styles/Palette";
import { LoginFormProps } from "../../interfaces/LoginFormProps";

const LoginFrom: React.FC<LoginFormProps> = ({
  email,
  handleEmailChange,
  password,
  handlePasswordChange,
  isEmailValid,
  isPasswordValid,
  IsConnexionScreen,
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  isSignUpPhaseOne,
}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.inputContainer}>
        <Text style={[FontsProps.regular(19), styles.subtitle]}>
          {IsConnexionScreen || !isSignUpPhaseOne ? "Email" : "Nom"}
        </Text>
        <View style={styles.inputView}>
          <TextInput
            value={IsConnexionScreen || !isSignUpPhaseOne ? email : lastName}
            onChangeText={
              IsConnexionScreen || !isSignUpPhaseOne
                ? handleEmailChange
                : handleLastNameChange
            }
            style={[styles.input, FontsProps.regular()]}
            selectionColor={Palette.green[1]}
          />
          {(IsConnexionScreen || !isSignUpPhaseOne
            ? isEmailValid
            : lastName && lastName.length > 1) && (
            <CheckIcon
              width={responsiveWidth(8)}
              height={responsiveWidth(8)}
              color={Palette.green[1]}
            />
          )}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={[FontsProps.regular(19), styles.subtitle]}>
          {IsConnexionScreen
            ? "Mot de passe"
            : isSignUpPhaseOne
            ? "Prénom"
            : "Mot de passe"}
        </Text>
        <View style={styles.inputView}>
          <TextInput
            value={
              IsConnexionScreen || !isSignUpPhaseOne ? password : firstName
            }
            onChangeText={
              IsConnexionScreen || !isSignUpPhaseOne
                ? handlePasswordChange
                : handleFirstNameChange
            }
            textContentType={
              IsConnexionScreen || !isSignUpPhaseOne ? "password" : "name"
            }
            secureTextEntry={
              IsConnexionScreen || !isSignUpPhaseOne ? true : false
            }
            style={[styles.input, FontsProps.regular()]}
            selectionColor={Palette.green[1]}
          />

          {(IsConnexionScreen || !isSignUpPhaseOne
            ? isPasswordValid
            : firstName && firstName.length > 1) && (
            <CheckIcon
              width={responsiveWidth(8)}
              height={responsiveWidth(8)}
              color={Palette.green[1]}
            />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    marginBottom: responsiveHeight(8),
  },
  subtitle: {
    height: responsiveHeight(5),
  },
  inputContainer: {
    width: responsiveWidth(80),
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Palette.black,
    width: responsiveWidth(70),
    paddingVertical: 0,
    paddingTop: responsiveHeight(1),
  },
  CheckIcon: {},
});
export default LoginFrom;
