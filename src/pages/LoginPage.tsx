import React, { useState, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, ViewStyle, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ROUTES_NAMES } from '../consts/Routes';
import { GlobalStyles } from '../consts/styles';
import { validateEmail } from '../utils';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { BackendError, incorrectEmail, unfilledInput } from '../consts/AlertMessegesConsts';
import { auth, signInWithEmailAndPassword } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InputContainerStyle extends ViewStyle {
	marginVertical?: number;
}

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
	const [email, setEmail] = useState(EMPTY_STRING);
	const [password, setPassword] = useState(EMPTY_STRING);
	const [showPassword, setShowPassword] = useState(false);

	const { HomePage, PasswordResetPage, SignupPage } = ROUTES_NAMES

	const handleLogin = async () => {
		try {
			if (email && password) {
				if (!validateEmail(email) && email !== EMPTY_STRING) {
					Alert.alert(incorrectEmail)
					return
				}
				const { user } = await signInWithEmailAndPassword(auth, email, password)
				await AsyncStorage.setItem('user', JSON.stringify(user?.uid));
				navigation.navigate(HomePage);
			} else {
				Alert.alert(unfilledInput)
			}
		} catch (e) {
			console.log(e)
			Alert.alert(BackendError)
		}
	};

	const handleSignUp = () => {
		navigation.navigate(SignupPage);
	};

	const handlePasswordReset = () => {
		navigation.navigate(PasswordResetPage);
	};

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Text style={GlobalStyles.titleTextStyle}>התחברות</Text>
			</View>
			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={GlobalStyles.inputStyle}
					placeholder="אימייל"
					value={email}
					onChangeText={setEmail}
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

			<TouchableOpacity style={GlobalStyles.buttonPinkStyle} onPress={handleLogin}>
				<Text style={GlobalStyles.buttonPinkTextStyle}> כניסה </Text>
			</TouchableOpacity>
			<Button color={GlobalStyles.colors.btnColor} title="  ליצירת חשבון חדש" onPress={handleSignUp} />
			<Button color={GlobalStyles.colors.btnColor} title="שכחתי סיסמא " onPress={handlePasswordReset} />
		</View>
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
	},
});


export default LoginPage;