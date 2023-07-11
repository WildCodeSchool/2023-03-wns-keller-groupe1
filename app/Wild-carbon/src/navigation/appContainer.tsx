import React, { useState, useEffect, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Profil from "../screens/Profil";
import Statistic from "../screens/Statistic";
import Social from "../screens/Social";
import Donation from "../screens/Donation";
import { useFonts } from "expo-font";
import { SplashScreen } from '../screens/SplashScreen';


const Stack = createStackNavigator();


function App() {
    const [fontsLoaded] = useFonts({
       "NotoSansJP-Regular": require("../assets/fonts/NotoSansJP-Regular.ttf"),
       "NotoSansJP-Bold": require("../assets/fonts/NotoSansJP-Bold.ttf"),
    });

    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setIsSplashVisible(false);
      }, 1000);
    }, []);
  
    if (isSplashVisible || !fontsLoaded) {
      return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"  screenOptions={{
            headerShown: false,
            
          }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Profil" component={Profil} />
                <Stack.Screen name="Statistic" component={Statistic} />
                <Stack.Screen name="Social" component={Social} />
                <Stack.Screen name="Donation" component={Donation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;