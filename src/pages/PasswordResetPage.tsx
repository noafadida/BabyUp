import React, { useState, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { ROUTES_NAMES } from '../consts/Routes';

const PasswordResetPage: FC<{ navigation: any }> = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(true);

	const { LoginPage, PasswordResetPage } = ROUTES_NAMES

	const handlePasswordResetButton = () => {
		// Handle password reset logic here
	};

	const handleEmailChange = (emailValue: any) => {
		setEmail(emailValue);
		if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
			setValidEmail(true)
			// setIsValid(validateFields());
		} else {
			setValidEmail(false)
		}
	};

	const handleLogin = () => {
		navigation.navigate(LoginPage);
	};

	const handlePasswordReset = () => {
		navigation.navigate(PasswordResetPage);
	};

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Text style={styles.titleText}>איפוס סיסמא</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="אימייל"
					value={email}
					onChangeText={handleEmailChange}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</View>
			{!validEmail && (
				<Text style={styles.errorText}>יש להזין כתובת מייל חוקית  </Text>
			)}

			<TouchableOpacity style={styles.button} onPress={handlePasswordResetButton}>
				<Text style={styles.buttonText}>לחץ כאן לאיפוס הסיסמא</Text>
			</TouchableOpacity>
			<Button title=" לעמוד ההתחברות" onPress={handleLogin} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	head: {
		flex: 0.4,
		justifyContent: 'flex-end',
		margin: 20
	},
	titleText: {
		fontSize: 22,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 8,
		width: '100%',
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#ccc',
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 4,
		marginRight: 8,
	},
	button: {
		backgroundColor: '#4285F4',
		paddingVertical: 10,
		paddingHorizontal: 50,
		borderRadius: 5,
		marginTop: 20,
		marginBottom: 20
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
	},
	errorText: {
		color: 'red',
		marginBottom: 16,
	},
});


export default PasswordResetPage;