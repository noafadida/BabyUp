import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { GlobalStyles } from '../consts/styles';
import { ROUTES_NAMES } from '../consts/Routes';

type Props = {
	navigation: any;
}

const StartScreen = ({ navigation }: Props) => {
	const { LoginScreenName, SignupScreenName } = ROUTES_NAMES

	const handleNavigation = (screenName: string) => {
		navigation.navigate(screenName)
	}

	return (
		<View style={styles.body}>
			<Image source={require('../../assets/babyupLogoNew.png')} style={{ resizeMode: 'contain', height: 300, width: 300 }} />
			<View style={styles.container}>
				<TouchableOpacity style={GlobalStyles.buttonPinkStyle} onPress={() => handleNavigation(LoginScreenName)}>
					<Text style={GlobalStyles.buttonPinkTextStyle}>כניסה למשתמש קיים</Text>
				</TouchableOpacity>
				<Button color={GlobalStyles.colors.btnColor} title=" ליצירת חשבון חדש " onPress={() => handleNavigation(SignupScreenName)} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 20,
		backgroundColor: GlobalStyles.colors.appBodyBackColor
	},
	container: {
		flex: 0.3,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20
	}
});

export default StartScreen;