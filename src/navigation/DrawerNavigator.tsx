import { createDrawerNavigator } from '@react-navigation/drawer';
import { GlobalStyles } from '../consts/styles';
import { SCREEN_NAMES } from '../consts/Routes';
import { Ionicons } from '@expo/vector-icons'
import HomePage from '../pages/HomePage';
import AboutUsPage from '../pages/AboutUsPage';
import CallUsPage from '../pages/CallUsPage';
import QuestionsPage from '../pages/QuestionsPage';
import LoginPage from '../pages/LoginPage';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

	const { home, aboutus, callus, qustions } = SCREEN_NAMES;

	return (
		<Drawer.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles.colors.headerBackColor, },
				headerTintColor: GlobalStyles.colors.headerTextColor,
				drawerActiveTintColor: GlobalStyles.colors.drawerActiveTextColor,
				drawerInactiveTintColor: GlobalStyles.colors.drawerInactiveTextColor,
				drawerPosition: 'right',
				drawerStyle: { backgroundColor: GlobalStyles.colors.drawerBackColor, }
			}}
		>
			<Drawer.Screen
				name={home}
				component={HomePage}
				options={{
					drawerLabel: "עמוד הבית",
					drawerIcon: ({ color, size }) => (<Ionicons name='home' color={color} size={size} />)
				}}
			/>
			<Drawer.Screen
				name={aboutus}
				component={AboutUsPage}
				options={{
					drawerLabel: "קצת עלינו ",
					drawerIcon: ({ color, size }) => (<Ionicons name='heart' color={color} size={size} />)
				}}
			/>
			<Drawer.Screen
				name={callus}
				component={CallUsPage}
				options={{
					drawerLabel: " צור קשר ",
					drawerIcon: ({ color, size }) => (<Ionicons name='chatbubble-ellipses-outline' color={color} size={size} />)
				}}
			/>
			<Drawer.Screen
				name={qustions}
				component={QuestionsPage}
				options={{
					drawerLabel: "שאלות נפוצות ",
					drawerIcon: ({ color, size }) => (<Ionicons name='help-outline' color={color} size={size} />)
				}}
			/>
			<Drawer.Screen
				name="התנתקות"
				component={LoginPage}
				options={{
					drawerLabel: "התנתקות",
					drawerIcon: ({ color, size }) => (<Ionicons name='exit-outline' color={color} size={size} />)
				}}
			/>
		</Drawer.Navigator >

	)

}
