import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontsProps from "../styles/fontProps";
import Palette from "../styles/Palette";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/shared/Button";
import UserContainer from "../components/container/UserContainer";
import { GetUsersByName } from "../services/getUsersByName";
import { useRoute } from "@react-navigation/native";
import { useGlobalState } from "../../GlobalStateContext";

const AddFriend: React.FC = () => {
  const navigation = useNavigation();
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

  const route = useRoute();
  const currentFriends = route.params?.currentFriends || [];
  const userId = user?.userId;
  const [isFocused, setIsFocused] = useState(false);
  const { getUsersByName, data, error, loading } = GetUsersByName();

  const handleTextChange = (text: string) => {
    getUsersByName({ variables: { name: text } });
    console.log(data, "liste");
  };
  const filteredUsers = data?.getUsersByName.filter(
    (user) =>
      !currentFriends.some((friend) => friend.userId === user.userId) &&
      user.userId !== userId
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.TopView}>
        <Text
          style={[
            FontsProps.bold(22, Palette.text.green),
            styles.headerTitleStyle,
          ]}
        >
          Quel est le pseudonyme de votre ami ?
        </Text>
      </View>
      <TextInput
        style={[
          styles.input,
          FontsProps.regular(19),
          isFocused ? styles.focusedInput : {},
        ]}
        placeholder="Pseudonyme"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={handleTextChange}
      ></TextInput>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.MainContainer}>
          {filteredUsers &&
            filteredUsers.map((user) => (
              <UserContainer key={user.userId} user={user} />
            ))}
        </View>
      </ScrollView>

      <View style={styles.BottomContainer}>
        <Button title="Retour" onPress={() => navigation.goBack()} whiteBtn />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TopView: {
    height: responsiveHeight(20),
    width: responsiveWidth(80),
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleStyle: {
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Palette.black,
    width: responsiveWidth(70),
    alignSelf: "center",
    height: responsiveHeight(8),
    marginBottom: responsiveHeight(5),
  },
  focusedInput: {
    borderBottomColor: "#2ECF77",
  },
  MainContainer: {},
  BottomContainer: {
    height: responsiveHeight(10),
    width: responsiveWidth(100),

    alignSelf: "center",
    display: "flex",
    alignItems: "center",
  },
});

export default AddFriend;
