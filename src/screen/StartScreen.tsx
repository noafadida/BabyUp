import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { GlobalStyles } from '../consts/styles';
import { ROUTES_NAMES } from '../consts/Routes';

const StartScreen: FC<{ navigation: any }> = ({ navigation }) => {
	const { LoginScreenName, SignupScreenName } = ROUTES_NAMES

    const handleLogin = () => {
		navigation.navigate(LoginScreenName);
    };

    const handleSignup = () => {
		navigation.navigate(SignupScreenName);
    };


    return (
        <View style={styles.body}>
            <Image source={require('../../assets/babyupLogoNew.png')} style={{ resizeMode: 'contain', height: 300, width: 300, }} />
            <View style={styles.container}>
                <TouchableOpacity style={GlobalStyles.buttonPinkStyle} onPress={handleLogin}>
                    <Text style={GlobalStyles.buttonPinkTextStyle}>כניסה למשתמש קיים</Text>
                </TouchableOpacity>
                <Button color={GlobalStyles.colors.btnColor} title=" ליצירת חשבון חדש " onPress={handleSignup} />
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
        paddingHorizontal: 20,
    },

});
export default StartScreen;