import React, { useState, FC, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ViewStyle, Pressable } from 'react-native';
import { ROUTES_NAMES } from '../consts/Routes';
import { GlobalStyles } from '../consts/styles';
import { auth, createUserWithEmailAndPassword, db, doc as firebaseDoc, setDoc } from '../firebase';
import DatePicker from 'react-native-datepicker';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { Ionicons } from '@expo/vector-icons';
import { Gender, InputContainerStyle } from '../types';
import moment from 'moment';
declare module 'react-native-datepicker';

type Props = {
	navigation?: any;
	route?: any;
}

const SignupPage: FC<{ navigation: any }> = ({ navigation, route }: Props) => {
	const [babyName, setBabyName] = useState('');
	const [birthdate, setBirthdate] = useState<string>(EMPTY_STRING);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const [dateValid, setDateValid] = useState(true);
	const [nameValid, setNameValid] = useState(true);

	const [Gender, setGender] = useState<Gender>('FEMALE');

	const { LoginPage } = ROUTES_NAMES

	useEffect(() => {
		if (birthdate !== EMPTY_STRING) {
			const ageMonths = moment().diff(moment(birthdate), 'months');
			if (ageMonths < 6 || ageMonths > 18) {
				Alert.alert("גיל התינוק/ת חייב להיות בין 6 ל18 חודשים")
				setDateValid(false)
				return
			}
			setDateValid(true)
		}
	}, [birthdate])

	const handleBabyNameChange = (babyNameValue: any) => {
		setBabyName(babyNameValue);
		setNameValid(babyNameValue.length >= 2)
	};

	const handleSignup = async () => {
		try {
			if (dateValid && nameValid) {
				const { email, password } = route?.params || {}
				await createUserWithEmailAndPassword(auth, email, password)
				if (auth?.currentUser) {
					saveUserInfo(auth?.currentUser?.uid)
				}
				navigation.navigate(LoginPage)
			} else {
				Alert.alert("שגיאה", "יש לנסות שוב ולמלא את הפרטים כנדרש")
			}
		} catch (error) {
			console.log(error)
		}
	}

	const saveUserInfo = async (uid: string) => {
		try {
			const { username, email } = route?.params || {}
			const docData = {
				parentName: username,
				gender: Gender,
				babyBirthDate: birthdate,
				babyName,
				email
			}
			const docRef = firebaseDoc(db, "users", uid);
			await setDoc(docRef, docData);
		} catch (e) {
			Alert.alert("Error adding document")
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Text style={GlobalStyles.titleTextStyle}>יצירת משתמש חדש</Text>
			</View>

			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={GlobalStyles.inputStyle}
					placeholder="שם התינוק/ת"
					value={babyName}
					onChangeText={handleBabyNameChange}

				/>
			</View>

			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={GlobalStyles.inputStyle}
					placeholder="תאריך לידה של התינוק/ת"
					value={birthdate}
					onTouchStart={() => {
						setShowDatePicker(true);
					}}
				/>
			</View>
			<Text style={styles.birthText}>הכנס את תאריך הלידה של התינוק/ת</Text>

			{showDatePicker && (
				<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
					<DatePicker
						style={styles.inputDate}
						date={birthdate}
						mode="date"
						placeholder="Select birthdate"
						format="YYYY-MM-DD"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						onDateChange={setBirthdate}

					/>
					<Button color={GlobalStyles.colors.btnColor} title="Done" onPress={() => setShowDatePicker(false)} />
				</View>
			)}


			{!nameValid && (
				<Text style={GlobalStyles.errorText}> יש להזין שם עם 2 אותיות לפחות </Text>
			)}

			{!dateValid && (
				<Text style={GlobalStyles.errorText}>גיל התינוק/ת חייב להיות בין 6 ל18 חודשים </Text>
			)}
			<View style={styles.gender}>
				<Pressable onPress={() => setGender('MALE')} style={[styles.genderButton, Gender === 'MALE' && { backgroundColor: '#abd3e7' }]}>
					<Ionicons style={styles.genderIcon} name="male-outline" size={24} color="#63a5c5" />
				</Pressable>
				<Pressable onPress={() => setGender('FEMALE')} style={[styles.genderButton, Gender === 'FEMALE' && { backgroundColor: '#f6c3cf' }]}>
					<Ionicons style={styles.genderIcon} name="female-outline" size={24} color="#bf697c" />
				</Pressable>
			</View>

			<TouchableOpacity style={GlobalStyles.buttonPinkStyle} onPress={handleSignup}>
				<Text style={GlobalStyles.buttonPinkTextStyle}> הרשמה </Text>
			</TouchableOpacity>
		</View>
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
	inputDate: {
		flex: 1,
		borderWidth: 0,
		paddingVertical: 8,
		paddingHorizontal: 2,
		borderRadius: 10,
	},
	birthText: {
		color: '#ccc',
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 10
	},
	genderButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginHorizontal: 10,
		borderRadius: 10
	},
	gender: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	genderIcon: {
		marginHorizontal: 10
	}
});

export default SignupPage;