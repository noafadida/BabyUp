import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export const ProfileScreen = () => {
	const navigation = useNavigation();

	const homeScreenTitle = () => (
		<View style={styles.homeHeader}>
			<Image
				source={require('../../assets/babyuplogo_.png')}
				style={{ resizeMode: 'contain', height: 40, width: 45, }}
			/>
			<Text>Hia</Text>
		</View>
	)
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: homeScreenTitle
		});
	}, [navigation]);

	return (
		<View style={styles.screen}>
			<Text>Profile Screen</Text>
		</View>
	)
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		justifyContent: 'center',
		backgroundColor: "white"
	},
	homeHeader: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});