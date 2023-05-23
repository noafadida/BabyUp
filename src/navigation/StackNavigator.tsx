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
import newsScreen from '../components/newsScreen';
import TipsScreen from '../components/TipsScreen';
import ArticleDetailsScreen from '../pages/ArticleDetailsScreen';
import TipsDetailsScreen from '../pages/TipsDetailsScreen';
import SuperFoodItemScreen from '../pages/SuperFoodItemScreen';
import AddMealPage from '../pages/AddMealPage';
import AddArticlePage from '../pages/AddArticlePage';
import AddTipPage from '../pages/AddTipPage';
import EditAboutUsPage from '../pages/EditAboutUsPage';


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

	const { babyUp, login, resetPassword, signup, home, newsScreenName, TipsScreenName, SuperFoodItem, AddMeal, AddArticle , AddTip, EditAboutUs} = SCREEN_NAMES;

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
			<Stack.Screen
				name="newsScreen"
				component={newsScreen}
				options={{ title: newsScreenName }}
			/>
			<Stack.Screen
				name="ArticleDetailsScreen"
				component={ArticleDetailsScreen}
			/>
			<Stack.Screen
				name="TipsScreen"
				component={TipsScreen}
			/>
			<Stack.Screen
				name="TipsDetailsScreen"
				component={TipsDetailsScreen}
			/>
			<Stack.Screen
				name="SuperFoodItemScreen"
				component={SuperFoodItemScreen}
			/>
			<Stack.Screen
				name="AddMealPage"
				component={AddMealPage}
				options={{ title: AddMeal }}
			/>
			<Stack.Screen
				name="AddArticlePage"
				component={AddArticlePage}
				options={{ title: AddArticle }}
			/>
			<Stack.Screen
				name="AddTipPage"
				component={AddTipPage}
				options={{ title: AddTip }}
			/>
			<Stack.Screen
				name="EditAboutUsPage"
				component={EditAboutUsPage}
				options={{ title: EditAboutUs }}
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
