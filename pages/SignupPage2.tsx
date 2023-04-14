import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FC } from 'react';
declare module 'react-native-datepicker';

import DatePicker from 'react-native-datepicker';






const SignupPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [babyName, setBabyName] = useState('');
    const [birthdate, setBirthdate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [dateValid, setDateValid] = useState(true);
    const [nameValid, setNameValid] = useState(true);

    const handleBirthday = (birthdayValue: any) => {
        setBirthdate(birthdayValue);
    };

    const handleBabyNameChange = (babyNameValue: any) => {
        setBabyName(babyNameValue);
        if (babyNameValue.length >= 2) {
            setNameValid(true)
        }
        else {
            setNameValid(false)
        }
    };

    const handleRegister2 = () => {
        // Handle registration logic here
    };

    const validateFields = () => {
        if (
            dateValid === true &&
            nameValid === true
        ) {
            navigation.navigate("LoginPage")
        }
        else {
            Alert.alert("שגיאה", "יש לנסות שוב ולמלא את הפרטים כנדרש")
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="שם התינוק/ת"
                    value={babyName}
                    onChangeText={handleBabyNameChange}

                />
            </View>

           
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="תאריך לידה של התינוק/ת"
                    value={birthdate.toDateString()}
                    onTouchStart={() => {
                        setShowDatePicker(true);
                    }}
                />
            </View>
            <Text style={styles.birthText}>הכנס את תאריך הלידה של התינוק/ת</Text>

            {showDatePicker && (
                <View style={styles.inputContainer}>
                    <DatePicker
                        style={styles.inputDate}
                        date={birthdate}
                        mode="date"
                        placeholder="Select birthdate"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(newDate: string) => {
                            const date = new Date(newDate); // Convert string to Date object
                            setBirthdate(date);
                        }}
                    />
                    <Button title="Done" onPress={() => setShowDatePicker(false)} />
                </View>
            )}


            {!nameValid && (
                <Text style={styles.errorText}> יש להזין שם עם 2 אותיות לפחות </Text>
            )}

            {!dateValid && (
                <Text style={styles.errorText}>גיל התינוק חייב להיות בין 6 ל18 חודשים </Text>
            )}
            <Button title="יצירת משתמש" onPress={validateFields} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    inputDate: {
        flex: 1,
        borderWidth: 0,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 0,
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
    birthText: {
        color:'pink'
    }
});

export default SignupPage;