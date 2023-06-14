import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../consts/styles';
import { validateEmail } from '../utils';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { incorrectEmail, loginError, unfilledInput } from '../consts/AlertMessegesConsts';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { InputContainerStyle } from '../types';
import { ROUTES_NAMES } from '../consts/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
	navigation: any;
}

const LoginScreen = ({ navigation }: Props) => {
	const [email, setEmail] = useState(EMPTY_STRING);
	const [password, setPassword] = useState(EMPTY_STRING);
	const [showPassword, setShowPassword] = useState(false);

	const { HomeScreenName, PasswordResetScreenName, SignupScreenName } = ROUTES_NAMES

	const handleLogin = async () => {
		try {
			if (email && password) {
				if (!validateEmail(email) && email !== EMPTY_STRING) {
					Alert.alert(incorrectEmail)
					return
				}
				const { user } = await signInWithEmailAndPassword(auth, email, password)
				await AsyncStorage.setItem('user', JSON.stringify(user?.uid));
				navigation.navigate(HomeScreenName);
			} else {
				Alert.alert(unfilledInput)
			}
		} catch (e: any) {
			Alert.alert(loginError)
		}
	};

	const handleSignUp = () => {
		navigation.navigate(SignupScreenName);
	};

	const handlePasswordReset = () => {
		navigation.navigate(PasswordResetScreenName);
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


export default LoginScreen;