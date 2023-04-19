import { View, Text, StyleSheet } from 'react-native'

export const FavoritesScreen = () => (
	<View style={styles.screen}>
		<Text>Favorite Screen</Text>
	</View>
);
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		justifyContent: 'center',
		backgroundColor: "white"
	}
});