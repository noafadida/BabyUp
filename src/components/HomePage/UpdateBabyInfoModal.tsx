import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, Button, Pressable, Alert } from 'react-native';
import { EMPTY_STRING } from '../../consts/GeneralConsts';
import { babyNameIsShort, babyNotInTheRightAge, usernameIsShort } from '../../consts/AlertMessegesConsts';
import { GlobalStyles } from '../../consts/styles';
import { Gender, InputContainerStyle } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { doc, setDoc, db } from '../../firebase'
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
declare module 'react-native-datepicker';

type Props = {
	onClose: () => void;
}

export default function UpdateBabyInfoModal({ onClose }: Props) {
	const [username, setUsername] = useState(EMPTY_STRING);
	const [errorMessage, setErrorMessage] = useState(EMPTY_STRING);
	const [babyName, setBabyName] = useState(EMPTY_STRING);
	const [birthdate, setBirthdate] = useState<string>(EMPTY_STRING);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isDateValid, setIsDateValid] = useState(true);
	const [Gender, setGender] = useState<Gender>('FEMALE');

	useEffect(() => {
		const isDidntValidUsername = !!username && username?.length < 3;
		isDidntValidUsername && setErrorMessage(usernameIsShort)

		const isBabyNameDidntValid = !!babyName && babyName?.length < 3;
		isBabyNameDidntValid && setErrorMessage(babyNameIsShort)

		const isValidInputs = !isDidntValidUsername && !isBabyNameDidntValid && isDateValid;
		isValidInputs && setErrorMessage(EMPTY_STRING)
	}, [username, babyName, isDateValid])


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

	const updateUserInfoHandler = async () => {
		if (!!username && !!Gender && !!birthdate && !!babyName) {
			try {
				const updatedInfo = {
					parentName: username,
					gender: Gender,
					babyBirthDate: birthdate,
					babyName
				}
				console.log(updatedInfo)
				const uid = await AsyncStorage.getItem('user')
				const parsedUID = JSON.parse(uid || '')
				const docRef = doc(db, "users", parsedUID);
				await setDoc(docRef, updatedInfo);
				console.log('success to add document')
				onClose()
			} catch (error) {
				Alert.alert('Oops, try again later')
			}
		} else {
			console.log('ERROR', errorMessage)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Text style={[GlobalStyles.titleTextStyle, { color: 'white' }]}>עריכת פרופיל</Text>
			</View>

			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={[GlobalStyles.inputStyle, { borderColor: 'white', textAlign: 'right' }]}
					placeholder="שם משתמש"
					value={username}
					onChangeText={setUsername}
				/>
			</View>
			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={[GlobalStyles.inputStyle, { borderColor: 'white', textAlign: 'right' }]}
					placeholder="שם התינוק/ת"
					value={babyName}
					onChangeText={setBabyName}

				/>
			</View>

			<View style={GlobalStyles.inputContainerStyle as InputContainerStyle}>
				<TextInput
					style={[GlobalStyles.inputStyle, { borderColor: 'white', textAlign: 'right' }]}
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
			<Pressable style={styles.updateButton} onPress={updateUserInfoHandler}>
				<Text>שמור שינויים</Text>
			</Pressable>
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
	updateButton: {
		padding: 10,
		backgroundColor: '#ddd',
		marginTop: 10,
		borderRadius: 10
	}
});
