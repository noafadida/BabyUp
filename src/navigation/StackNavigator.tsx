import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from "../consts/styles";
import { Image, StyleSheet, Text, View } from "react-native";
import { SCREEN_NAMES } from "../consts/Routes";
import StartPage from "../pages/StartPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import SignupPage2 from "../pages/SignupPage2";
import PasswordResetPage from "../pages/PasswordResetPage";
import MealsOverViewScreen from "../components/MealsOverViewScreen";
import MealDetailScreen from "../pages/MealDetailScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {

	const headerTitle = () => (
		<View style={styles.homeHeader}>
			<Text style={styles.text}>BabyUp</Text>
			<Image
				source={require('../../assets/babyupLogoNew.png')}
				style={styles.image}
			/>
		</View>
	)

	const { babyUp, login, resetPassword, signup, home } = SCREEN_NAMES;

	return (
		<Stack.Navigator screenOptions={{
			title: "Apply to all",
			headerStyle: { backgroundColor: GlobalStyles.colors.headerBackColor }, headerTintColor: GlobalStyles.colors.headerTextColor,
		}}>
			<Stack.Screen
				name="StartPage"
				component={StartPage}
				options={{ headerTitle, title: babyUp }}

			/>
			<Stack.Screen
				name="LoginPage"
				component={LoginPage}
				options={{ headerTitle, title: login }}
			/>
			<Stack.Screen
				name="SignupPage"
				component={SignupPage}
				options={{ headerTitle, title: signup }}
			/>
			<Stack.Screen
				name="HomePage"
				component={DrawerNavigator}
				options={{ headerShown: false, headerTitle, title: home }}
			/>
			<Stack.Screen
				name="SignupPage2"
				component={SignupPage2}
				options={{ headerTitle, title: signup }}
			/>
			<Stack.Screen
				name="PasswordResetPage"
				component={PasswordResetPage}
				options={{ headerTitle, title: resetPassword }}
			/>
			<Stack.Screen
				name="MealsOverViewScreen"
				component={MealsOverViewScreen}
			/>
			<Stack.Screen
				name="MealDetailScreen"
				component={MealDetailScreen}
			/>
		</Stack.Navigator>

	)
}

const styles = StyleSheet.create({
	homeHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "center",
		left: 145,
	},
	text: {
		color: "white",
		fontFamily: "DancingScript",
		fontSize: 20,
		marginBottom: 5,
		letterSpacing: 0.9
	},
	image: {
		resizeMode: 'contain',
		height: 50,
		width: 50
	}
})
