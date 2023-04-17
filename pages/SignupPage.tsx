import React, { useState, FC } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const SignupPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [validUsername, setValidUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [isEqual, setIsEqual] = useState(true);

    const handleEmailChange = (emailValue: any) => {
        setEmail(emailValue);
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            setValidEmail(true)
            setIsValid(true)
        } else {
            setValidEmail(false)
            setIsValid(false)
        }
    };

    const handleUsernameChange = (usernameValue: any) => {
        setUsername(usernameValue);
        if (usernameValue.length >= 3) {
            setValidUsername(true)
            setIsValid(true)
        }
        else {
            setValidUsername(false)
            setIsValid(false)
        }
    };

    const handlePasswordChange = (passwordValue: any) => {
        setPassword(passwordValue);
        if (passwordValue.length >= 6) {
            setValidPassword(true)
            setIsValid(true)
        }
        else {
            setValidPassword(false)
            setIsValid(false)
        }
    };

    const handleConfirmPasswordChange = (confirmPasswordValue: any) => {
        setConfirmPassword(confirmPasswordValue);
        if (password === confirmPasswordValue) {
            setIsEqual(true)
            setIsValid(true)
        }
        else {
            setIsEqual(false)
            setIsValid(false)
        }
    };

    const handleRegister = () => {
        // Handle registration logic here
    };

    const validateFields = () => {
        if (
            validEmail === true &&
            validUsername === true &&
            validPassword === true &&
            isEqual === true &&
            isValid === true
        ) {
            navigation.navigate("SignupPage2")
        }
        else {
            Alert.alert("שגיאה", "יש לנסות שוב ולמלא את הפרטים כנדרש")
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.head}>
            <Text style={styles.titleText}>יצירת משתמש חדש</Text>
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

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="שם משתמש"
                    value={username}
                    onChangeText={handleUsernameChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="סיסמא"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={handlePasswordChange}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={24} color="#4285F4" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                {isEqual &&
                    <TextInput
                        style={styles.input}
                        placeholder="יש להקליד שוב את הסיסמא "
                        value={confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                    />}
                {!isEqual &&
                    <TextInput
                        style={styles.errorInput}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                    />}

                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={24} color="#4285F4" />
                </TouchableOpacity>
            </View>

            {!validEmail && (
                <Text style={styles.errorText}>יש להזין כתובת מייל חוקית  </Text>
            )}

            {!validUsername && (
                <Text style={styles.errorText}> יש להזין שם משתמש עם 3 תווים לפחות </Text>
            )}

            {!validPassword && (
                <Text style={styles.errorText}>יש להזין סיסמא עם 6 תווים לפחות </Text>
            )}


            {/* <TouchableOpacity style={[styles.button, isValid ? null : styles.disabledButton]} disabled={!isValid} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity> */}
            <Button title="המשך" onPress={validateFields} />
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
        margin:20
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
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginTop: 20,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    errorInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginRight: 8,
    },
  
});

export default SignupPage;