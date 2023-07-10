import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Pressable } from 'react-native';
import { GlobalStyles } from '../consts/styles';
import { auth, createUserWithEmailAndPassword, db, doc as firebaseDoc, setDoc } from '../firebase';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { Ionicons } from '@expo/vector-icons';
import { Gender } from '../types';
import { ROUTES_NAMES } from '../consts/Routes';
import { Collections } from '../consts/firebaseConsts';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AllergyList from '../components/AllergyList';
import CustomModal from '../components/CustomModal';

declare module 'react-native-datepicker';

type Props = {
	navigation: any;
	route: any;
}
const SignupScreen2 = ({ navigation, route }: Props) => {
	const [babyName, setBabyName] = useState(EMPTY_STRING);
	const [birthdate, setBirthdate] = useState<string>(EMPTY_STRING);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isAllergyBabyModalOpen, setIsAllergyBabyModalOpen] = useState<boolean>(false)
	const [dateValid, setDateValid] = useState(true);
	const [nameValid, setNameValid] = useState(true);

	const [Gender, setGender] = useState<Gender>('FEMALE');

	const [selectedAllergies, setSelectedAllergies] = useState<boolean[]>([])

	const toggleAllergy = (allergyId: number) => {
		const updatedState = [...selectedAllergies]
		updatedState[allergyId] = !updatedState[allergyId]
		setSelectedAllergies(updatedState)
	};

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
				navigation.navigate(ROUTES_NAMES.LoginScreenName)
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
				email,
				selectedAllergies,
				isAdmin: false
			}
			const docRef = firebaseDoc(db, Collections.users, uid);
			await setDoc(docRef, docData);
		} catch (e) {
			console.log(e)
			Alert.alert("Error adding document")
		}
	}

	const onModalClose = () => {
		setIsAllergyBabyModalOpen(false)
	}

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Text style={GlobalStyles.titleTextStyle}>יצירת משתמש חדש</Text>
			</View>

			<View style={GlobalStyles.inputContainerStyle as any}>
				<TextInput
					style={GlobalStyles.inputStyle}
					placeholder="שם התינוק/ת"
					value={babyName}
					onChangeText={handleBabyNameChange}
				/>
			</View>

			<View style={GlobalStyles.inputContainerStyle as any}>
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
				<View style={GlobalStyles.inputContainerStyle as any}>
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
			<TouchableOpacity onPress={() => setIsAllergyBabyModalOpen(true)} style={GlobalStyles.buttonLightStyle}>
				<Text style={[GlobalStyles.buttonLightTextStyle, { color: '#fb6f92' }]}>רגישויות לתינוק/ת </Text>
			</TouchableOpacity>
			{isAllergyBabyModalOpen && (
				<CustomModal onClose={() => setIsAllergyBabyModalOpen(false)} visible={isAllergyBabyModalOpen} animationType='fade' transparent>
					<AllergyList onClose={onModalClose} toggleAllergy={toggleAllergy} selectedAllergies={selectedAllergies} />
				</CustomModal>
			)}
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
	},
	updateButton: {
		padding: 10,
		backgroundColor: '#ddd',
		marginTop: 10,
		borderRadius: 10
	}
});

export default SignupScreen2;