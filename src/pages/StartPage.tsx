import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';

const StartPage: FC<{ navigation: any }> = ({ navigation }) => {

    const handleLogin = () => {
        navigation.navigate("LoginPage");
    };

    const handleSignup = () => {
        navigation.navigate("SignupPage");
    };

    const handleStartPage = () => {
        //logic
    };

    return (
        <View style={styles.body}>
            <Image source={require('../assets/babyupLogoNew.png')} style={{ resizeMode: 'contain', height: 300, width: 300, }} />

            <View style={styles.container}>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>כניסה למשתמש קיים</Text>
                </TouchableOpacity>
                <Button title=" ליצירת חשבון חדש " onPress={handleSignup} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        paddingHorizontal: 90,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10
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


export default StartPage;