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
import FontsProps from "../../styles/fontProps";
import Palette from "../../styles/Palette";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlusIcon, CheckMarkCircleLinedIcon } from "../../assets/index";
import { useSendFriendRequest } from "../../services/friendRequest";
import { useGlobalState } from "../../../GlobalStateContext";

interface UserProps {
  user: {
    firstname: string;
    lastname: string;
    userId: number;
  };
}

const UserContainer: React.FC<UserProps> = ({ user }) => {
  const { sendFriendRequest } = useSendFriendRequest();
  const [requestSent, setRequestSent] = useState(false);
  const [globalState, setGlobalState] = useGlobalState();

  const handleSendRequest = async () => {
    try {
      await sendFriendRequest({
        variables: { userId: globalState.user.userId, friendId: user.userId },
      });
      setRequestSent(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande d'ami:", error);
    }
  };

  return (
    <View style={styles.UserContainer}>
      <View style={styles.UserInfoContainer}>
        <Text style={[FontsProps.bold(), { marginBottom: -20 }]}>Pseudo</Text>
        <Text style={FontsProps.regular()}>
          {user.firstname + " " + user.lastname}
        </Text>
      </View>
      <View style={styles.IconContainer}>
        <TouchableOpacity onPress={handleSendRequest}>
          {requestSent ? (
            <CheckMarkCircleLinedIcon
              width={responsiveWidth(10)}
              height={responsiveWidth(10)}
              color={Palette.primary}
            />
          ) : (
            <PlusIcon
              width={responsiveWidth(8)}
              height={responsiveWidth(8)}
              color={Palette.grey[2]}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  UserContainer: {
    backgroundColor: Palette.grey[1],
    height: responsiveHeight(10),
    width: responsiveWidth(90),
    alignSelf: "center",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  UserInfoContainer: {
    width: "80%",
    paddingHorizontal: responsiveWidth(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  IconContainer: {
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserContainer;
