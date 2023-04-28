import React, { useState, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ROUTES_NAMES } from '../consts/Routes';
import { GlobalStyles } from '../consts/styles';

interface InputContainerStyle extends ViewStyle {
	marginVertical?: number;
}
  
const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const { HomePage, PasswordResetPage, SignupPage } = ROUTES_NAMES

	const handleLogin = () => {
		navigation.navigate(HomePage);
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