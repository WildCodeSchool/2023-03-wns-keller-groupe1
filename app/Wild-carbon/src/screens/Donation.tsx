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
import { useFetchDonations } from "../services/getDonations";

const Donation: React.FC = () => {
  const totalDonations = useFetchDonations();

  return (
    <ScrollView>
      <View style={styles.TopView}>
        <Text style={FontsProps.subtitleLogin()}>Soutenez Wild Carbon</Text>
        <Image source={images.GreenLeaf} style={styles.Logo} />
      </View>
      <View style={styles.MainContainer}>
        <Text style={FontsProps.regularSmall()}>
          Wild-Carbon est une application gratuite vous permettant de suivre
          votre empreinte carbone. Pour maintenir notre plateforme et continuer
          à développer de nouvelles fonctionnalités, nous avons besoin de votre
          soutien.
        </Text>
        <Text style={FontsProps.regularSmall()}>
          Votre contribution financière, quel qu'en soit le montant, aidera à
          assurer la pérennité de Wild-Carbon et à intensifier notre combat
          contre le changement climatique.
        </Text>
      </View>

      <View style={styles.FooterContainer}>
        <Image source={images.DonationCard} style={styles.DonationCard} />
        <Text style={[FontsProps.title(), styles.TotalDonationsText]}>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(totalDonations)}{" "}
        </Text>
      </View>

      {/* <Button
        title="SOUTENIR LE PROJET"
        onPress={() => console.log("ok")}
        style={styles.donationButton}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  TopView: {
    height: responsiveHeight(12),
    width: responsiveWidth(100),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginLeft: 5,
  },
  MainContainer: {
    paddingHorizontal: responsiveWidth(7),
  },
  FooterContainer: {
    width: responsiveWidth(100),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveHeight(5),
  },
  DonationCard: {
    width: responsiveWidth(80),
    height: (160 / 343) * responsiveWidth(80),
  },
  TotalDonationsText: {
    position: "absolute",
    left: responsiveWidth(15),
    bottom: responsiveHeight(8.5),
  },
  donationButton: {
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(5),
    alignSelf: "center",
  },
});
export default Donation;
