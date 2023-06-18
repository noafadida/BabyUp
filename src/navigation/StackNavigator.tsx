import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from "../consts/styles";
import { Image, StyleSheet, Text, View } from "react-native";
import { SCREEN_NAMES, ROUTES_NAMES } from "../consts/Routes";
import StartScreen from "../screen/StartScreen";
import LoginScreen from "../screen/LoginScreen";
import SignupScreen from "../screen/SignupScreen";
import SignupScreen2 from "../screen/SignupScreen2";
import PasswordResetScreen from "../screen/PasswordResetScreen";
import MealsOverViewScreen from "../components/MealsOverViewScreen";
import MealDetailScreen from "../screen/MealDetailScreen";
import DrawerNavigator from "./DrawerNavigator";
import ArticlesScreen from '../components/ArticlesScreen';
import TipsScreen from '../components/TipsScreen';
import ArticleDetailsScreen from '../screen/ArticleDetailsScreen';
import TipsDetailsScreen from '../screen/TipsDetailsScreen';
import SuperFoodItemScreen from '../screen/SuperFoodItemScreen';
import AddMealScreen from '../screen/AddMealScreen';
import AddArticleScreen from '../screen/AddArticleScreen';
import AddTipScreen from '../screen/AddTipScreen';
import EditAboutUsScreen from '../screen/EditAboutUsScreen';


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

	const { babyUp, login, resetPassword, signup, home, newsScreenTitle, AddMeal, AddArticle, AddTip, EditAboutUs } = SCREEN_NAMES;

	const {
		AddArticleScreenName, AddMealScreenName, AddTipScreenName, ArticleDetailsScreenName, EditAboutUsScreenName, HomeScreenName, LoginScreenName, MealDetailScreenName, MealsOverViewScreenName, PasswordResetScreenName, SignupScreen2Name, SignupScreenName, StartScreenName, SuperFoodItemScreenName, TipsDetailsScreenName, TipsScreenName, articleScreenName
	} = ROUTES_NAMES;
	
	return (
		<Stack.Navigator screenOptions={{
			title: "Apply to all",
			headerStyle: { backgroundColor: GlobalStyles.colors.headerBackColor }, headerTintColor: GlobalStyles.colors.headerTextColor,
		}}>
			<Stack.Screen
				name={StartScreenName}
				component={StartScreen}
				options={{ headerTitle, title: babyUp }}

			/>
			<Stack.Screen
				name={LoginScreenName}
				component={LoginScreen}
				options={{ headerTitle, title: login }}
			/>
			<Stack.Screen
				name={SignupScreenName}
				component={SignupScreen}
				options={{ headerTitle, title: signup }}
			/>
			<Stack.Screen
				name={HomeScreenName}
				component={DrawerNavigator}
				options={{ headerShown: false, headerTitle, title: home }}
			/>
			<Stack.Screen
				name={SignupScreen2Name}
				component={SignupScreen2}
				options={{ headerTitle, title: signup }}
			/>
			<Stack.Screen
				name={PasswordResetScreenName}
				component={PasswordResetScreen}
				options={{ headerTitle, title: resetPassword }}
			/>
			<Stack.Screen
				name={MealsOverViewScreenName}
				component={MealsOverViewScreen}
			/>
			<Stack.Screen
				name={MealDetailScreenName}
				component={MealDetailScreen}
			/>
			<Stack.Screen
				name={articleScreenName}
				component={ArticlesScreen}
				options={{ title: newsScreenTitle }}
			/>
			<Stack.Screen
				name={ArticleDetailsScreenName}
				component={ArticleDetailsScreen}
			/>
			<Stack.Screen
				name={TipsScreenName}
				component={TipsScreen}
			/>
			<Stack.Screen
				name={TipsDetailsScreenName}
				component={TipsDetailsScreen}
			/>
			<Stack.Screen
				name={SuperFoodItemScreenName}
				component={SuperFoodItemScreen}
			/>
			<Stack.Screen
				name={AddMealScreenName}
				component={AddMealScreen}
				options={{ title: AddMeal }}
			/>
			<Stack.Screen
				name={AddArticleScreenName}
				component={AddArticleScreen}
				options={{ title: AddArticle }}
			/>
			<Stack.Screen
				name={AddTipScreenName}
				component={AddTipScreen}
				options={{ title: AddTip }}
			/>
			<Stack.Screen
				name={EditAboutUsScreenName}
				component={EditAboutUsScreen}
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
