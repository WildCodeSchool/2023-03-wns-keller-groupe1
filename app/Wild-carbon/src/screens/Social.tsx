import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useGlobalState } from "../../GlobalStateContext";
import Palette from "../styles/Palette";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontsProps from "../styles/fontProps";
import { images } from "../assets";
import Button from "../components/shared/Button";
import FriendRequestContainer from "../components/container/FriendRequestContainer";
import FriendUserContainer from "../components/container/FriendUserContainer";
import { useGetAllFriendRequests } from "../services/friendRequest";
import { useGetUserFriendList } from "../services/getUserFriendList";

const Social: React.FC = () => {
  const navigation = useNavigation();
  const [globalState, setGlobalState] = useGlobalState();

  const {
    friendRequests,
    refetch: refetchFriendRequests,
    error,
  } = useGetAllFriendRequests(globalState?.user?.userId);

  const {
    userFriendsLists,
    error: friendsListError,
    refetch: refetchUserFriendsLists,
  } = useGetUserFriendList(globalState?.user?.userId);

  React.useEffect(() => {
    console.log(userFriendsLists, "userFriendsLists");
  }, [userFriendsLists]);

  const pendingFriendRequests =
    friendRequests?.filter((request) => !request.accepted) || [];
  return (
    <ScrollView>
      <View style={styles.MainContainer}>
        {pendingFriendRequests && pendingFriendRequests.length > 0 && (
          <View>
            <View style={styles.TitleContainer}>
              <Text style={FontsProps.questionDashboard()}>
                Demandes d’amis :
              </Text>
            </View>
            {pendingFriendRequests.map((request) => (
              <FriendRequestContainer
                key={request.id}
                data={request}
                refetchFriendRequests={refetchFriendRequests}
                refetchUserFriendsLists={refetchUserFriendsLists}
              />
            ))}
          </View>
        )}
        <View style={styles.TitleContainer}>
          <Text style={FontsProps.questionDashboard()}>Vos groupe :</Text>
        </View>

        {userFriendsLists && userFriendsLists.length > 0 && (
          <View>
            <View style={styles.TitleContainer}>
              <Text style={FontsProps.questionDashboard()}>
                Votre liste d’amis :
              </Text>
            </View>
            {userFriendsLists.map((friend) => (
              <FriendUserContainer
                key={friend.userId}
                firstname={friend.firstname}
                lastname={friend.lastname}
                totalCo2={friend.totalCo2}
              />
            ))}
          </View>
        )}
      </View>
      <View style={styles.BottomContainer}>
        <View style={styles.BtnContainer}>
          <Button
            title="Crée un groupe"
            onPress={() => console.log("ok")}
            style={{
              width: responsiveWidth(43),
            }}
            whiteBtn
          />
        </View>
        <View style={styles.BtnContainer}>
          <Button
            title="Ajoutez un ami"
            onPress={() =>
              navigation.navigate("AddFriend", {
                currentFriends: userFriendsLists,
              })
            }
            style={{ width: responsiveWidth(43) }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  TitleContainer: {
    height: responsiveHeight(10),
    display: "flex",
    justifyContent: "center",
    marginLeft: responsiveWidth(5),
  },
  BottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    height: responsiveHeight(15),
    width: responsiveWidth(100),
  },
  BtnContainer: {
    width: responsiveWidth(50),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Social;
