import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { GlobalStyles } from '../consts/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';

const CallUsScreen = () => {
	const handleEmail = () => {
		MailComposer.composeAsync({
			recipients: ["babyupteam@gmail.com"]
		})
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={require('../../assets/pinkBack.jpeg')} resizeMode="cover" style={styles.image}>
				<View style={styles.bottomContainer}>
					<Text style={styles.textDown}>
						דברו איתנו
					</Text>
				</View>
				<View style={styles.bottomContainer}>
					<Text style={[styles.textDown, { fontWeight: "normal", marginTop: 10 }]}>
						+972-529999999
					</Text>
					<Text style={[styles.textDown, { marginTop: 5, fontWeight: "normal" }]}>
						babyup@gmail.com
					</Text>
					<TouchableOpacity onPress={handleEmail} style={GlobalStyles.buttonPinkStyle}>
						<Text style={{ color: "white" }}>Send Us Mail</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	)
}

export default CallUsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		textAlign: "center",
		marginBottom: 10,
		fontSize: 16,
		fontWeight: "bold",
		color: GlobalStyles.colors.appBodyBackColor,
	},
	textDown: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
		color: "#FFF"
	},
	bottomContainer: {
		marginTop: 30,
		padding: 8,
	},
	image: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 40
	},
})