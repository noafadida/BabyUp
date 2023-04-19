import { View, Text, StyleSheet } from 'react-native'

export const ProfileTab = () => {

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
	}
});