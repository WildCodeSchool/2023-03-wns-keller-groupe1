import React from "react";
import { Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Profil: React.FC = () => {
  const navigation = useNavigation();

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
      <Text>Profil</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Se Déconnecter</Text>
      </TouchableOpacity>
    </>
  );
};

export default Profil;
