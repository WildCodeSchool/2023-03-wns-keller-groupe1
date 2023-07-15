import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Profil from "../screens/Profil";
import Statistic from "../screens/Statistic";
import Social from "../screens/Social";
import Donation from "../screens/Donation";

import { useFonts } from "expo-font";
import { SplashScreen } from "../screens/SplashScreen";
import Palette from "../styles/Palette";

import {
  HomeIcon,
  ChartIcon,
  GroupIcon,
  DonationIcon,
  ProfileIcon,
} from "../assets/index";

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [fontsLoaded] = useFonts({
    "NotoSansJP-Regular": require("../assets/fonts/NotoSansJP-Regular.ttf"),
    "NotoSansJP-Bold": require("../assets/fonts/NotoSansJP-Bold.ttf"),
  });

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabIcon = ({ icon, focused }) => {
    return icon({
      width: responsiveWidth(8),
      height: responsiveWidth(8),
      color: focused ? Palette.green[4] : Palette.disabled,
    });
  };

  
  const MainTabs = () => (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: responsiveHeight(9),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Palette.grey[1],
        },
        tabBarActiveTintColor: Palette.green[4],

        tabBarLabelStyle: {
          marginBottom: responsiveHeight(1),
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, icon: HomeIcon }),
          headerStyle: {
            backgroundColor: Palette.green[4],
            height: responsiveHeight(14),
          },
          headerTitleStyle: {
            color: Palette.white,
            fontSize: responsiveWidth(8),
            fontFamily: "NotoSansJP-Bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Statistic"
        component={Statistic}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, icon: ChartIcon }),
          headerStyle: {
            backgroundColor: Palette.green[4],
            height: responsiveHeight(14),
          },
          headerTitleStyle: {
            color: Palette.white,
            fontSize: responsiveWidth(8),
            fontFamily: "NotoSansJP-Bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, icon: GroupIcon }),
          headerStyle: {
            backgroundColor: Palette.green[4],
            height: responsiveHeight(14),
          },
          headerTitleStyle: {
            color: Palette.white,
            fontSize: responsiveWidth(8),
            fontFamily: "NotoSansJP-Bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Donation"
        component={Donation}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, icon: DonationIcon }),
          headerStyle: {
            backgroundColor: Palette.green[4],
            height: responsiveHeight(14),
          },
          headerTitleStyle: {
            color: Palette.white,
            fontSize: responsiveWidth(8),
            fontFamily: "NotoSansJP-Bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, icon: ProfileIcon }),
          headerStyle: {
            backgroundColor: Palette.green[4],
            height: responsiveHeight(14),
          },
          headerTitleStyle: {
            color: Palette.white,
            fontSize: responsiveWidth(8),
            fontFamily: "NotoSansJP-Bold",
          },
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );

  const MainStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  if (isSplashVisible || !fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
