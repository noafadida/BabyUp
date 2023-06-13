import { ROUTES_NAMES } from "../consts/Routes";
import { auth, db, doc, getDoc, setDoc, signOut } from "../firebase";
import { setFavoriteMeals } from "../store/redux/favorites";
import { Alert } from "react-native";
import { BackendError } from "../consts/AlertMessegesConsts";
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

export const fetchFavoriteMeals = async (dispatch: any) => {
	try {
		const uid = await retrieveUserData()
		if (uid) {
			const docRef = doc(db, 'favorite', uid);
			const getDocRef = await getDoc(docRef);
			const getDocRefData = getDocRef.data()
			const updateMealsData = { ...getDocRefData }
			dispatch(setFavoriteMeals({ meals: updateMealsData }))
			await setDoc(docRef, updateMealsData);
		}
	} catch (e) {
		console.log(e)
		Alert.alert(BackendError)
	}
}