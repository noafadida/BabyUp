import React, { FC } from "react";
import { StyleSheet } from "react-native";
import StartPage from "./pages/StartPage"
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage"
import SignupPage2 from "./pages/SignupPage2"
import PasswordResetPage from "./pages/PasswordResetPage"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';;
import { Image } from 'react-native';

// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();





const App: FC = () => {
  const clickHandler = () => {
    alert("Clicked");
  };
  const MainStackNavigator = () =>
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
        // options={{ title: "דף הבית" }}
        options={{ headerShown: false }}
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
      {/* <Stack.Screen
            name="Conversation"
            component={Conversation}
            options={({ route }) => ({
              title: route.params?.user.name,
            })}
          ></Stack.Screen>  */}
    </Stack.Navigator>
  );


  // const AppDrawerNavigator = () => (
  //   <Drawer.Navigator initialRouteName="HomePage">
  //     <Drawer.Screen name="HomePage" component={HomePage} />
  //     {/* Add additional drawer screens here */}
  //   </Drawer.Navigator>
  // );

  const navOptions = {
    headerTitle: () => <Image source={require('./assets/babyuplogo_.png')} style={{ resizeMode: 'contain', height: 40, width: 45, }} />
  };

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  textStyle: {
    color: "green",
    fontWeight: "bold",
    fontSize: 50,
  },
});

export default App;