import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import FontsProps from "../styles/fontProps";
import { CheckIcon } from "../assets/index";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Palette from "../styles/Palette";

interface Props {
  email: string;
  handleEmailChange: (value: string) => void;
  password: string;
  handlePasswordChange: (value: string) => void;
  isEmailValid: boolean;
  isPasswordValid: boolean;
  IsConnexionScreen: boolean;
  firstName?: string;
  handleFirstNameChange: (value: string) => void;
  lastName?: string;
  handleLastNameChange: (value: string) => void;
  isSignUpPhaseOne?: boolean;
}

const LoginFrom: React.FC<Props> = ({
  email,
  handleEmailChange,
  password,
  handlePasswordChange,
  isEmailValid,
  isPasswordValid,
  IsConnexionScreen,
}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.inputContainer}>
        <Text style={[FontsProps.regularLarge(), styles.subtitle]}>Email</Text>
        <View style={styles.inputView}>
          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            style={[styles.input, FontsProps.regular()]}
          />
          {isEmailValid && (
            <CheckIcon
              width={responsiveWidth(8)}
              height={responsiveWidth(8)}
              color={Palette.green[1]}
            />
          )}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={[FontsProps.regularLarge(), styles.subtitle]}>
          Mot de passe
        </Text>
        <View style={styles.inputView}>
          <TextInput
            value={password}
            onChangeText={handlePasswordChange}
            textContentType="password"
            secureTextEntry={true}
            style={[styles.input, FontsProps.regular()]}
          />
          {isPasswordValid && (
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
