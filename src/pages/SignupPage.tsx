import React, { useState, FC } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, ViewStyle, TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ROUTES_NAMES } from '../consts/Routes';
import { GlobalStyles } from '../consts/styles';

interface InputContainerStyle extends ViewStyle {
    marginVertical?: number;
}



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

    const { SignupPage2 } = ROUTES_NAMES

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
            navigation.navigate(SignupPage2)
        }
        else {
            Alert.alert("שגיאה", "יש לנסות שוב ולמלא את הפרטים כנדרש")
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
                    onChangeText={handleEmailChange}
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
                    onChangeText={handleUsernameChange}
                />
            </View>

            <View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
                <TextInput
                    style={GlobalStyles.inputStyle}
                    placeholder="סיסמא"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={handlePasswordChange}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={24} color="#ccc" />
                </TouchableOpacity>
            </View>

            <View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
                {isEqual &&
                    <TextInput
                    style={GlobalStyles.inputStyle}
                        placeholder="יש להקליד שוב את הסיסמא "
                        value={confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                    />}
                {!isEqual &&
                    <TextInput
                        style={styles.errorInputContainer}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                    />}

                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={24} color="#ccc" />
                </TouchableOpacity>
            </View>

            {!validEmail && (
                <Text style={GlobalStyles.errorText}>יש להזין כתובת מייל חוקית  </Text>
    )
}

{
    !validUsername && (
        <Text style={GlobalStyles.errorText}> יש להזין שם משתמש עם 3 תווים לפחות </Text>
    )
}

{
    !validPassword && (
        <Text style={GlobalStyles.errorText}>יש להזין סיסמא עם 6 תווים לפחות </Text>
    )
}
<Button color={GlobalStyles.colors.btnColor} title="המשך" onPress={validateFields} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: GlobalStyles.colors.appBodyBackColor,
    },
    head: {
        flex: 0.4,
        justifyContent: 'flex-end',
        margin: 20
    },
    errorInputContainer: {
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