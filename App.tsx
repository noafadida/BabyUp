import React, { FC } from "react";
import StartPage from "./pages/StartPage"
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage"
import SignupPage2 from "./pages/SignupPage2"
import PasswordResetPage from "./pages/PasswordResetPage"
import MealsOverViewScreen from "./pages/MealsOverViewScreen"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from 'react-native';


const Stack = createNativeStackNavigator();

const App: FC = () => {
  const MainStackNavigator = ({ navigation }: any) =>
  (
    <Stack.Navigator screenOptions={{ title: "Apply to all", ...navOptions }}>
      <Stack.Screen
        name="StartPage"
        component={StartPage}
        options={{ title: "BabyUp" }}
      ></Stack.Screen>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ title: "התחברות" }}
      ></Stack.Screen>
      <Stack.Screen
        name="SignupPage"
        component={SignupPage}
        options={{ title: "הרשמה" }}
      ></Stack.Screen>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ title: "דף הבית", headerBackVisible: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="SignupPage2"
        component={SignupPage2}
        options={{ title: "הרשמה" }}
      ></Stack.Screen>
      <Stack.Screen
        name="PasswordResetPage"
        component={PasswordResetPage}
        options={{ title: "איפוס סיסמא" }}
      ></Stack.Screen>
      <Stack.Screen
        name="MealsOverViewScreen"
        component={MealsOverViewScreen}
        options={{ title: "MealsOverViewScreen ", headerStyle: { backgroundColor: "Black" } }}
      ></Stack.Screen>
    </Stack.Navigator>
  );

  const navOptions = {
    headerTitle: () => <Image source={require('./assets/babyuplogo_.png')} style={{ resizeMode: 'contain', height: 40, width: 45, }} />
  };

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;