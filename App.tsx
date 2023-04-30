import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux';
import { GlobalStyles } from './src/consts/styles';
import { SCREEN_NAMES } from "./src/consts/Routes";
import { store } from './src/store/redux/store';
import { useFonts } from 'expo-font';
import HomePage from "./src/pages/HomePage";
import StartPage from "./src/pages/StartPage";
import LoginPage from "./src/pages/LoginPage";
import SignupPage from "./src/pages/SignupPage";
import SignupPage2 from "./src/pages/SignupPage2";
import PasswordResetPage from "./src/pages/PasswordResetPage";
import MealsOverViewScreen from "./src/components/MealsOverViewScreen";
import MealDetailScreen from './src/pages/MealDetailScreen';
import AboutUsPage from './src/pages/AboutUsPage';
import CallUsPage from './src/pages/CallUsPage'
import QuestionsPage from './src/pages/QuestionsPage';
import Fonts from './assets/fonts/fonts';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const App: FC = () => {
	const [loaded] = useFonts({DancingScript: Fonts.DancingScript});

	if (!loaded) {
		return null;
	}

	const { babyUp, login, resetPassword, signup, home, aboutus, callus, qustions } = SCREEN_NAMES;

	const headerTitle = () => (
		<View style={styles.homeHeader}>
			<Text style={styles.text}>BabyUp</Text>
			<Image
				source={require('./assets/babyupLogoNew.png')}
				style={styles.image}
			/>
		</View>
	)

	function MyDrawer() {
		return (
			<Drawer.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: GlobalStyles.colors.headerBackColor,},
					headerTintColor: GlobalStyles.colors.headerTextColor,
					drawerActiveTintColor: GlobalStyles.colors.drawerActiveTextColor,
					drawerInactiveTintColor: GlobalStyles.colors.drawerInactiveTextColor,
					drawerPosition: 'right',
					drawerStyle: { backgroundColor: GlobalStyles.colors.drawerBackColor, }
				}}>
				<Drawer.Screen
					name={home}
					component={HomePage}
					options={{
						drawerLabel: "עמוד הבית", drawerIcon: ({ color, size }) => (<Ionicons name='home' color={color} size={size} />)
					}}
				/>
				<Drawer.Screen
					name={aboutus}
					component={AboutUsPage}
					options={{
						drawerLabel: "קצת עלינו ", drawerIcon: ({ color, size }) => (<Ionicons name='heart' color={color} size={size} />)
					}}
				/>
				<Drawer.Screen
					name={callus}
					component={CallUsPage}
					options={{
						drawerLabel: " צור קשר ", drawerIcon: ({ color, size }) => (<Ionicons name='chatbubble-ellipses-outline' color={color} size={size} />)
					}}
				/>
				<Drawer.Screen
					name={qustions}
					component={QuestionsPage}
					options={{
						drawerLabel: "שאלות נפוצות ", drawerIcon: ({ color, size }) => (<Ionicons name='help-outline' color={color} size={size} />)
					}}
				/>
				<Drawer.Screen
					name="התנתקות"
					component={LoginPage}
					options={{
						drawerLabel: "התנתקות", drawerIcon: ({ color, size }) => (<Ionicons name='exit-outline' color={color} size={size} />)
					}}
				/>
			</Drawer.Navigator >
		);
	}


	const MainStackNavigator = ({ navigation }: any) =>
	(
		<Provider store={store}>
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
					component={MyDrawer}
					options={{ headerShown: false,headerTitle, title: home }}
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
		</Provider>
	);

	return (
		<NavigationContainer>
			<MainStackNavigator/>
		</NavigationContainer>
	);
};

export default App;

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
		letterSpacing:0.9
	},
	image: {
		resizeMode: 'contain',
		height: 50,
		width: 50
	}
})
