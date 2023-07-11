import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import splashImage from '../../config/splash.png';
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25A55F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
});