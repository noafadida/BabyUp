import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from 'react-native';
import { SCREEN_NAMES } from "./consts/Routes";
import StartPage from "./pages/StartPage"
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage"
import SignupPage2 from "./pages/SignupPage2"
import PasswordResetPage from "./pages/PasswordResetPage"
import MealsOverViewScreen from "./pages/MealsOverViewScreen"
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerScreen from "./pages/Drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App: FC = () => {
	const { babyUp, home, login, resetPassword, signup, MealsOverview } = SCREEN_NAMES;

	const navOptions = {
		headerTitle: () => <Image source={require('./assets/babyuplogo_.png')} style={{ resizeMode: 'contain', height: 40, width: 45, }} />
	};

	const MainStackNavigator = ({ navigation }: any) =>
	(
		<Stack.Navigator screenOptions={{ title: "Apply to all", ...navOptions }}>
			<Stack.Screen
				name="StartPage"
				component={StartPage}
				options={{ title: babyUp }}
			></Stack.Screen>
			<Stack.Screen
				name="LoginPage"
				component={LoginPage}
				options={{ title: login }}
			></Stack.Screen>
			<Stack.Screen
				name="SignupPage"
				component={SignupPage}
				options={{ title: signup }}
			></Stack.Screen>
			<Stack.Screen
				name="HomePage"
				component={HomePage}
				options={{ title: home, headerBackVisible: false }}
			></Stack.Screen>
			<Stack.Screen
				name="SignupPage2"
				component={SignupPage2}
				options={{ title: signup }}
			></Stack.Screen>
			<Stack.Screen
				name="PasswordResetPage"
				component={PasswordResetPage}
				options={{ title: resetPassword }}
			></Stack.Screen>
			<Stack.Screen
				name="MealsOverViewScreen"
				component={MealsOverViewScreen}
				options={{ title: MealsOverview, headerStyle: { backgroundColor: "Black" } }}
			></Stack.Screen>
		</Stack.Navigator>
	);

	function MyDrawer() {
		return (
			<Drawer.Navigator>
				<Drawer.Screen name="Home" component={MainStackNavigator} />
				<Drawer.Screen name="Drawer" component={DrawerScreen} />
			</Drawer.Navigator>
		);
	}

	return (
		<NavigationContainer>
			<MyDrawer />
		</NavigationContainer>
	);
};

export default App;
