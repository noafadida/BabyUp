import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { ROUTES_NAMES } from '../consts/Routes';
import { GlobalStyles } from '../consts/styles';

const StartPage: FC<{ navigation: any }> = ({ navigation }) => {
    const { LoginPage, SignupPage } = ROUTES_NAMES

    const handleLogin = () => {
        navigation.navigate(LoginPage);
    };

    const handleSignup = () => {
        navigation.navigate(SignupPage);
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
export default StartPage;