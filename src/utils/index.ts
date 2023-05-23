import { ROUTES_NAMES } from "../consts/Routes";
import { auth, signOut } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveUserData = async () => {
  try {
    const value = await AsyncStorage.getItem("user");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

export const validateEmail = (email: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(String(email).toLowerCase());
};

export const logoutHandler = async (navigation: any) => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem("user");
    navigation.navigate(ROUTES_NAMES.LoginPage);
  } catch (e) {
    console.log(e);
  }
};
