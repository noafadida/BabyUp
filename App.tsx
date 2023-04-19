import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from 'react-native';
import { SCREEN_NAMES } from "./consts/Routes";
import { createDrawerNavigator } from '@react-navigation/drawer';
import StartPage from "./pages/StartPage"
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage"
import SignupPage2 from "./pages/SignupPage2"
import PasswordResetPage from "./pages/PasswordResetPage"
import MealsOverViewScreen from "./pages/MealsOverViewScreen"
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App: FC = () => {
	const { babyUp, login, resetPassword, signup, MealsOverview, home } = SCREEN_NAMES;

	const headerTitle = () => (
		<Image
			source={require('./assets/babyuplogo_.png')}
			style={{ resizeMode: 'contain', height: 40, width: 45, }}
		/>
	)

	const homeScreenTitle = () => (
		<View style={styles.homeHeader}>
			<Image
				source={require('./assets/babyuplogo_.png')}
				style={{ resizeMode: 'contain', height: 40, width: 45, }}
			/>
			<Text>Hi</Text>
		</View>
	)

	function MyDrawer() {
		return (
			<Drawer.Navigator>
				<Drawer.Screen
					name={home}
					component={HomePage}
					options={{ headerTitle: homeScreenTitle }}
				/>
			</Drawer.Navigator>
		);
	}

	const MainStackNavigator = ({ navigation }: any) =>
	(
		<Stack.Navigator screenOptions={{ title: "Apply to all" }}>
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
				component={MyDrawer}
				options={{ headerShown: false }}
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
				options={{ headerTitle, title: MealsOverview, headerStyle: { backgroundColor: "Black" } }}
			/>
		</Stack.Navigator>
	);

	return (
		<NavigationContainer>
			<MainStackNavigator />
		</NavigationContainer>
	);
};

export default App;


const styles = StyleSheet.create({
	homeHeader: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});