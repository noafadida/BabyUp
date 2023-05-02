import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, Button, Pressable } from 'react-native';
import { EMPTY_STRING } from '../../consts/GeneralConsts';
import { validateEmail } from '../../utils';
import { babyNameIsShort, babyNotInTheRightAge, incorrectEmail, usernameIsShort } from '../../consts/AlertMessegesConsts';
import { GlobalStyles } from '../../consts/styles';
import { Gender } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
declare module 'react-native-datepicker';

interface InputContainerStyle extends ViewStyle {
	marginVertical?: number;
}

export default function UpdateBabyInfoModal() {
	const [email, setEmail] = useState(EMPTY_STRING);
	const [username, setUsername] = useState(EMPTY_STRING);
	const [errorMessage, setErrorMessage] = useState(EMPTY_STRING);
	const [babyName, setBabyName] = useState(EMPTY_STRING);
	const [birthdate, setBirthdate] = useState<string>(EMPTY_STRING);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isDateValid, setIsDateValid] = useState(true);
	const [Gender, setGender] = useState<Gender>('FEMALE');

	useEffect(() => {
		const isValidEmail = validateEmail(email);
		!!email && !isValidEmail && setErrorMessage(incorrectEmail)

		const isDidntValidUsername = !!username && username?.length < 3;
		isDidntValidUsername && setErrorMessage(usernameIsShort)

		const isBabyNameDidntValid = !!babyName && babyName?.length < 3;
		isBabyNameDidntValid && setErrorMessage(babyNameIsShort)

		const isValidInputs = isValidEmail && !isDidntValidUsername && !isBabyNameDidntValid && isDateValid;
		isValidInputs && setErrorMessage(EMPTY_STRING)
	}, [email, username])


	useEffect(() => {
		if (birthdate !== EMPTY_STRING) {
			const ageMonths = moment().diff(moment(birthdate), 'months');
			if (ageMonths < 6 || ageMonths > 18) {
				setErrorMessage(babyNotInTheRightAge)
				setIsDateValid(false)
				return
			}
			setIsDateValid(true)
		}
	}, [birthdate])


	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Text style={[GlobalStyles.titleTextStyle, { color: 'white' }]}>עריכת פרופיל</Text>
			</View>
			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={[GlobalStyles.inputStyle, { borderColor: 'white' }]}
					placeholder="אימייל"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</View>

			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={[GlobalStyles.inputStyle, { borderColor: 'white' }]}
					placeholder="שם משתמש"
					value={username}
					onChangeText={setUsername}
				/>
			</View>
			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={[GlobalStyles.inputStyle, { borderColor: 'white' }]}
					placeholder="שם התינוק/ת"
					value={babyName}
					onChangeText={setBabyName}

				/>
			</View>

			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={[GlobalStyles.inputStyle, { borderColor: 'white' }]}
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


			<View style={styles.gender}>
				<Pressable onPress={() => setGender('MALE')} style={[styles.genderButton, Gender === 'MALE' && { backgroundColor: '#abd3e7' }]}>
					<Ionicons style={styles.genderIcon} name="male-outline" size={24} color="#63a5c5" />
				</Pressable>
				<Pressable onPress={() => setGender('FEMALE')} style={[styles.genderButton, Gender === 'FEMALE' && { backgroundColor: '#f6c3cf' }]}>
					<Ionicons style={styles.genderIcon} name="female-outline" size={24} color="#bf697c" />
				</Pressable>
			</View>
			{!!errorMessage && <Text style={[GlobalStyles.errorText, { marginTop: 10 }]}>{errorMessage}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '80%',
		backgroundColor: '#afd4e3',
		padding: 15,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	head: {
		marginBottom: 10
	},
	inputContainerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 8,
		width: '100%',
	},
	birthText: {
		color: '#ffffff',
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
	},
	inputDate: {
		flex: 1,
		borderWidth: 0,
		paddingVertical: 8,
		paddingHorizontal: 2,
		borderRadius: 10
	},
});
