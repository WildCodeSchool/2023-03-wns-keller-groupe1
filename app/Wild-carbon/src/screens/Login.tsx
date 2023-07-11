import React, { useState } from "react";
import { images } from "../assets";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Palette from "../styles/Palette";
import FontsProps from "../styles/fontProps";
import LoginFrom from "../components/LoginForm";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [IsConnexionScreen, setIsConnexionScreen] = useState(true);
  const [isSignUpPhaseOne, setIsSignUpPhaseOne] = useState(true);

  const isValidEmail = (email: string): boolean => {
    const re: RegExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    const re: RegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{6,}$/;
    return re.test(password);
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
    setIsEmailValid(isValidEmail(email));
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    setIsPasswordValid(isValidPassword(password));
  };

  const handleButtonClick = () => {
    if (IsConnexionScreen) {
      console.log(`Email: ${email}, Password: ${password}`);
    } else {
      if (isSignUpPhaseOne) {
        setIsSignUpPhaseOne(false);
      } else {
        console.log(
          `First name: ${firstName}, Last name: ${lastName}, Email: ${email}, Password: ${password}`
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <Image source={images.LogoGreen} style={styles.Logo} />
      <Text style={[FontsProps.subtitleLogin(), styles.subtitle]}>
        {IsConnexionScreen ? "Connectez vous" : "Inscrivez-vous"}
      </Text>
      <LoginFrom
        email={email}
        handleEmailChange={setEmail}
        password={password}
        handlePasswordChange={setPassword}
        firstName={firstName}
        handleFirstNameChange={setFirstName}
        lastName={lastName}
        handleLastNameChange={setLastName}
        isEmailValid={isEmailValid}
        isPasswordValid={isPasswordValid}
        IsConnexionScreen={IsConnexionScreen}
        isSignUpPhaseOne={isSignUpPhaseOne}
      />
      <Button
        title={
          IsConnexionScreen
            ? "SE CONNECTER"
            : isSignUpPhaseOne
            ? "SUIVANT"
            : "S'INSCRIRE"
        }
        disabled={
          IsConnexionScreen
            ? !isEmailValid || !isPasswordValid
            : isSignUpPhaseOne
            ? firstName.length < 2 || lastName.length < 2
            : !isEmailValid || !isPasswordValid
        }
      />
      <TouchableOpacity
        onPress={() => {
          setIsConnexionScreen(!IsConnexionScreen);
        }}
      >
        <Text style={[FontsProps.subtitle(), styles.subtitlebtn]}>
          {IsConnexionScreen ? "S'inscrire" : "Se connecter"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Logo: {
    width: responsiveWidth(100),
    height: responsiveHeight(20),
  },
  subtitle: {
    marginBottom: responsiveHeight(4),
    marginTop: responsiveHeight(4),
  },
  subtitlebtn: {
    marginTop: responsiveHeight(5),
  },
});
export default Login;
