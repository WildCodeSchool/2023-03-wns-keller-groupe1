import React, { useEffect, useState } from "react";
import { images } from "../assets";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/shared/Button";
import FontsProps from "../styles/fontProps";
import LoginFrom from "../components/form/LoginForm";
import { useAuth } from "../services/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [IsConnexionScreen, setIsConnexionScreen] = useState(true);
  const [isSignUpPhaseOne, setIsSignUpPhaseOne] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { handleFormSubmit } = useAuth();

  const isValidEmail = (email: string): boolean => {
    const re: RegExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    const re: RegExp = /^.{6,}$/;
    return re.test(password);
  };

  const handleButtonClick = () => {
    if (IsConnexionScreen) {
      handleFormSubmit(
        false,
        email,
        password,
        firstName,
        lastName,
        setIsLoading
      );
    } else {
      if (isSignUpPhaseOne) {
        setIsSignUpPhaseOne(false);
      } else {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setIsEmailValid(false);
        setIsPasswordValid(false);
        setIsConnexionScreen(!IsConnexionScreen);
        handleFormSubmit(
          true,
          email,
          password,
          firstName,
          lastName,
          setIsLoading
        );
      }
    }
  };
  useEffect(() => {
    setIsEmailValid(isValidEmail(email));
    setIsPasswordValid(isValidPassword(password));
  }, [email, password]);

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
        onPress={handleButtonClick}
      />
      <TouchableOpacity
        onPress={() => {
          if (!isSignUpPhaseOne) {
            setIsSignUpPhaseOne(true);
          } else {
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setIsEmailValid(false);
            setIsPasswordValid(false);
            setIsConnexionScreen(!IsConnexionScreen);
          }
        }}
      >
        <Text style={[FontsProps.subtitle(), styles.subtitlebtn]}>
          {IsConnexionScreen
            ? "S'inscrire"
            : isSignUpPhaseOne
            ? "Se connecter"
            : "Retour"}
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
    height: responsiveWidth(100) * (2 / 3),
  },
  subtitle: {
    marginBottom: responsiveHeight(4),
  },
  subtitlebtn: {
    marginTop: responsiveHeight(5),
  },
});
export default Login;
