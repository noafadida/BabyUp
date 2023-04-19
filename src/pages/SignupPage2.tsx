import React, { useState, FC } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { ROUTES_NAMES } from '../consts/Routes';


declare module 'react-native-datepicker';

const SignupPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [babyName, setBabyName] = useState('');
    const [birthdate, setBirthdate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [dateValid, setDateValid] = useState(true);
    const [nameValid, setNameValid] = useState(true);

	const { LoginPage } = ROUTES_NAMES

    const handleBirthday = (birthdayValue: any) => {
        const ageMonths = moment().diff(moment(birthdayValue), 'months');
        console.log("ageMonths of the baby: ", ageMonths)

        if (ageMonths < 6 || ageMonths > 18) {
            Alert.alert("שגיאה", "גיל התינוק/ת חייב להיות בין 6 ל18 חודשים")
            setDateValid(false)
            return
        }
        else {
            setDateValid(true)
            setBirthdate(birthdayValue);
        }

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


    const validateFields = () => {
        if (
            dateValid === true &&
            nameValid === true
        ) {
            navigation.navigate(LoginPage)
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
                            handleBirthday(date)
                        }}
                    />
                    <Button title="Done" onPress={() => setShowDatePicker(false)} />
                </View>
            )}


            {!nameValid && (
                <Text style={styles.errorText}> יש להזין שם עם 2 אותיות לפחות </Text>
            )}

            {!dateValid && (
                <Text style={styles.errorText}>גיל התינוק/ת חייב להיות בין 6 ל18 חודשים </Text>
            )}
            <TouchableOpacity style={styles.button} onPress={validateFields}>
                <Text style={styles.buttonText}> הרשמה </Text>
            </TouchableOpacity>
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
    inputDate: {
        flex: 1,
        borderWidth: 0,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 0,
    },
    disabledButton: {
        opacity: 0.5,
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
        color: 'pink'
    }
});

export default SignupPage;