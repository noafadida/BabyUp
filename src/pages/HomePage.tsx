import React, { FC, useLayoutEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TAB_ROUTES_NAMES } from '../consts/Routes';
import { TIcon } from '../../types';
import { ProfileTab } from '../components/HomePage/ProfileTab';
import { HomeTab } from '../components/HomePage/HomeTab';
import { FavoritesTab } from '../components/HomePage/FavoriteTab';



const HomePage: FC<{ route: any, navigation: any, }> = ({ navigation, route }) => {
	const Tab = createBottomTabNavigator();
	const { FavoritesScreen, HomeScreen, ProfileScreen } = TAB_ROUTES_NAMES

	const name = route.params //NEED TO FIX

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View style={styles.homeHeader}>
					<Text style={styles.text}>BabyUp</Text>
					<Image
						source={require('../../assets/babyupLogoNew.png')}
						style={styles.image}
					/>
				</View>
			)
		});
	}, [name, route]);

	return (
		<View style={styles.container}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName: string | undefined;
						if (route.name === HomeScreen) {
							iconName = focused ? "home" : "home-outline";
						} else if (route.name === ProfileScreen) {
							iconName = focused ? "person" : "person-outline";
						} else if (route.name === FavoritesScreen) {
							iconName = focused ? 'ios-heart' : 'ios-heart-outline'
						}
						return <Ionicons name={iconName as TIcon} size={size} color={color} />;
					},
					tabBarActiveTintColor: "#ff477e",
					tabBarInactiveTintColor: "#ccc",
					headerShown: false,
					tabBarStyle: { paddingTop: 6 },

				})}
			>
				<Tab.Screen
					name={ProfileScreen}
					component={ProfileTab}
					initialParams={{ name: ProfileScreen }}
					options={{
						title: "הפרופיל שלי"
					}}
				/>
				<Tab.Screen
					name={HomeScreen}
					component={HomeTab}
					initialParams={{ name: HomeScreen }}
					options={{
						title: "עמוד הבית"
					}}
				/>
				<Tab.Screen
					name={FavoritesScreen}
					component={FavoritesTab}
					initialParams={{ name: FavoritesScreen }}
					options={{ title: "המועדפים שלי" }}
				/>
			</Tab.Navigator>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	homeHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "center",
		left: 145
	},
	text: {
		color: "white",
		fontFamily: "DancingScript",
		fontSize: 20,
		textAlignVertical: "center",
		marginBottom: 5, 
		letterSpacing:0.9
	},
	image: {
		resizeMode: 'contain',
		height: 50,
		width: 50
	}
});


export default HomePage;