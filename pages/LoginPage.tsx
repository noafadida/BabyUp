import React, { useState, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        navigation.navigate("HomePage");
    };

    const handleSignUp = () => {
        navigation.navigate("SignupPage");
    };

    const handlePasswordReset = () => {
        navigation.navigate("PasswordResetPage");
    };

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.titleText}>התחברות</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="שם משתמש"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="סיסמא"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={24} color="#4285F4" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}> כניסה </Text>
            </TouchableOpacity>
            <Button title="  ליצירת חשבון חדש" onPress={handleSignUp} />
            <Button title="שכחתי סיסמא " onPress={handlePasswordReset} />
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
        paddingHorizontal: 70,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});


export default LoginPage;