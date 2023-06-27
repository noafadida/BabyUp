import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BackendError, incorrectEmail, passwordDidntLong, unmatchedPasswords, usernameIsShort } from '../consts/AlertMessegesConsts';
import { fetchSignInMethodsForEmail, auth } from '../firebase'
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../consts/styles';
import { validateEmail } from '../utils';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { InputContainerStyle } from '../types';
import { ROUTES_NAMES } from '../consts/Routes';

type Props = {
	navigation: any;
}

const SignupScreen = ({ navigation }: Props) => {
	const [email, setEmail] = useState(EMPTY_STRING);
	const [username, setUsername] = useState(EMPTY_STRING);
	const [password, setPassword] = useState(EMPTY_STRING);
	const [confirmPassword, setConfirmPassword] = useState(EMPTY_STRING);
	const [errorMessage, setErrorMessage] = useState(EMPTY_STRING);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		const isValidEmail = validateEmail(email);
		!!email && !isValidEmail && setErrorMessage(incorrectEmail)

		const isDidntValidUsername = !!username && username?.length < 3;
		isDidntValidUsername && setErrorMessage(usernameIsShort)

		const isShortPassword = !!password && password?.length < 6;
		isShortPassword && setErrorMessage(passwordDidntLong);

		const isPasswordsDifferent = !!password && confirmPassword !== password;
		isPasswordsDifferent && setErrorMessage(unmatchedPasswords);

		const isValidInputs = isValidEmail && !isDidntValidUsername && !isShortPassword && !isPasswordsDifferent;
		isValidInputs && setErrorMessage(EMPTY_STRING)
		setIsValid(isValidInputs);
	}, [email, password, confirmPassword, username])


	const handleSignup = async () => {
		try {
			if (isValid) {
				const methods = await fetchSignInMethodsForEmail(auth, email);
				if (methods?.length === 0) {
					navigation.navigate(ROUTES_NAMES.SignupScreen2Name, { email, password, username })
				} else {
					Alert.alert('כתובת המייל שהזנת קיימת במערכת')
				}
			} else {
				Alert.alert('נסה שנית')
			}
		} catch (e) {
			Alert.alert(BackendError)
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Text style={GlobalStyles.titleTextStyle}>יצירת משתמש חדש</Text>
			</View>

			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={GlobalStyles.inputStyle}
					placeholder="אימייל"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</View>

			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={GlobalStyles.inputStyle}
					placeholder="שם משתמש"
					value={username}
					onChangeText={setUsername}
				/>
			</View>

			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={GlobalStyles.inputStyle}
					placeholder="סיסמא"
					value={password}
					secureTextEntry={!showPassword}
					onChangeText={setPassword}
				/>
				<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
					<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={24} color="#ccc" />
				</TouchableOpacity>
			</View>

			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={GlobalStyles.inputStyle}
					placeholder="יש להקליד שוב את הסיסמא "
					value={confirmPassword}
					secureTextEntry={!showConfirmPassword}
					onChangeText={setConfirmPassword}
				/>
				<TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
					<MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={24} color="#ccc" />
				</TouchableOpacity>
			</View>
			{!!errorMessage && <Text style={GlobalStyles.errorText}>{errorMessage}</Text>}
			<Button color={GlobalStyles.colors.btnColor} title="הרשמה" onPress={handleSignup} />
		</View >
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 20,
		backgroundColor: GlobalStyles.colors.appBodyBackColor
	},
	head: {
		flex: 0.4,
		justifyContent: 'flex-end',
		margin: 20
	}
});

export default SignupScreen;