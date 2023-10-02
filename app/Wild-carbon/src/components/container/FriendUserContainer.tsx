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
import { FriendUserContainerProps } from "../../interfaces/SocialContainerProps";
const FriendUserContainer: React.FC<FriendUserContainerProps> = ({
  firstname,
  lastname,
  totalCo2,
}) => {
  const [isDetailed, setIsDetailed] = useState(false);

  return (
    <TouchableOpacity
      style={
        isDetailed
          ? styles.FriendUserContainerDetail
          : styles.FriendUserContainer
      }
      onPress={() => setIsDetailed(!isDetailed)}
    >
      <View style={styles.NotDetailedContainer}>
        <View style={styles.UserInfoContainer}>
          <Text style={[FontsProps.bold(), { marginBottom: -20 }]}>Pseudo</Text>
          <Text style={FontsProps.regular()}>
            {firstname} {lastname}
          </Text>
        </View>

        <View style={styles.UserTotalC02Container}>
          <Text style={FontsProps.bold()}>{totalCo2} kg Co2</Text>
        </View>
      </View>

      {isDetailed && (
        <TouchableOpacity
          style={styles.TouchableDeleteUser}
          onPress={() => console.log("ok")}
        >
          <Text style={FontsProps.bold(14, Palette.red[1])}>
            Retirer de la liste d'amis
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  FriendUserContainer: {
    backgroundColor: Palette.grey[1],
    height: responsiveHeight(10),
    width: responsiveWidth(90),
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  FriendUserContainerDetail: {
    backgroundColor: Palette.grey[1],
    height: responsiveHeight(13),
    width: responsiveWidth(90),
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  NotDetailedContainer: {
    display: "flex",
    flexDirection: "row",
  },
  UserInfoContainer: {
    width: "70%",
    paddingHorizontal: responsiveWidth(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  UserTotalC02Container: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  TouchableDeleteUser: {
    alignSelf: "flex-end",
    marginRight: responsiveWidth(5),
    marginTop: responsiveHeight(-1.5),
  },
});

export default FriendUserContainer;
