import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'

export const FavoritesTab = ({ route, navigation }: any) => {
	console.log(route.params)
	const { name } = route.params //NEED TO FIX

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View style={styles.homeHeader}>
					<Image
						source={require('../../../assets/babyuplogo_.png')}
						style={{ resizeMode: 'contain', height: 40, width: 45, }}
					/>
					<Text>sdad</Text>
				</View>
			)
		});
	}, [navigation]);

	return (
		<View style={styles.screen}>
			<Text>Favorite Screen</Text>
		</View>
	)
}
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