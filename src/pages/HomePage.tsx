import React, { FC, useLayoutEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TAB_ROUTES_NAMES } from '../consts/Routes';
import { TIcon } from '../../types';
import { ProfileTab } from '../components/HomePage/ProfileTab';
import { HomeTab } from '../components/HomePage/HomeTab';
import { FavoritesTab } from '../components/HomePage/FavoriteTab';


const HomePage: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
	const Tab = createBottomTabNavigator();
	const { FavoritesScreen, HomeScreen, ProfileScreen } = TAB_ROUTES_NAMES

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View style={styles.homeHeader}>
					<Image
						source={require('../../assets/babyuplogo_.png')}
						style={{ resizeMode: 'contain', height: 40, width: 45, }}
					/>
					<Text>{route.name}</Text>
				</View>
			)
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName: String | undefined;
						if (route.name === HomeScreen) {
							iconName = focused ? "home" : "home-outline";
						} else if (route.name === ProfileScreen) {
							iconName = focused ? "person-circle" : "person-circle-outline";
						} else if (route.name === FavoritesScreen) {
							iconName = focused ? 'ios-heart' : 'ios-heart-outline'
						}

						return <Ionicons name={iconName as TIcon} size={size} color={color} />;
					},
					tabBarActiveTintColor: "#4285F4",
					tabBarInactiveTintColor: "grey",
					headerShown: false
				})}
			>
				<Tab.Screen
					name={ProfileScreen}
					component={ProfileTab}
					initialParams={{ name: ProfileScreen }}
				/>

				<Tab.Screen
					name={HomeScreen}
					component={HomeTab}
					initialParams={{ name: HomeScreen }}
				/>

				<Tab.Screen
					name={FavoritesScreen}
					component={FavoritesTab}
					initialParams={{ name: ProfileScreen }}
				/>
			</Tab.Navigator>
		</View>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	button: {
		backgroundColor: '#4285F4',
		paddingVertical: 10,
		paddingHorizontal: 70,
		borderRadius: 5,
		marginTop: 20,
		marginBottom: 20
	},
	buttonText: {
		color: '#fff',
		fontSize: 18
	},
	homeHeader: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});


export default HomePage;