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
import { useSendFriendRequest } from "../../services/friendRequest";
import { useGlobalState } from "../../../GlobalStateContext";
import { CheckIcon, CloseIcon } from "../../assets/index";
import {
  useAcceptFriendRequest,
  useDeleteFriendRequest,
} from "../../services/friendRequest";
import { FriendRequestContainerProps } from "../../interfaces/SocialContainerProps";

const FriendRequestContainer: React.FC<FriendRequestContainerProps> = ({
  data,
  refetchFriendRequests,
  refetchUserFriendsLists,
}) => {
  const { acceptFriendRequest } = useAcceptFriendRequest();
  const { deleteFriendRequest } = useDeleteFriendRequest();

  const handleAccept = async () => {
    await acceptFriendRequest({ variables: { id: data.id } });
    refetchFriendRequests();
    refetchUserFriendsLists();
  };

  const handleReject = async () => {
    await deleteFriendRequest({
      variables: { deleteFriendRequestId: data.id },
    });
    refetchFriendRequests();
    refetchUserFriendsLists();
  };

  return (
    <View style={styles.FriendRequestContainer}>
      <View style={styles.FriendInfoContainer}>
        <Text style={FontsProps.bold()}>
          {data.userSender.firstname} {data.userSender.lastname}
        </Text>
      </View>
      <View style={styles.IconContainer}>
        <TouchableOpacity onPress={handleAccept}>
          <CheckIcon
            width={responsiveWidth(9.5)}
            height={responsiveWidth(9.5)}
            color={Palette.black}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReject}>
          <CloseIcon
            width={responsiveWidth(9)}
            height={responsiveWidth(9)}
            color={Palette.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FriendRequestContainer: {
    backgroundColor: Palette.grey[1],
    height: responsiveHeight(10),
    width: responsiveWidth(90),
    alignSelf: "center",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  FriendInfoContainer: {
    width: "60%",
    paddingHorizontal: responsiveWidth(5),
  },
  IconContainer: {
    width: "40%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(6),
  },
});

export default FriendRequestContainer;
