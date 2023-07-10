import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Pressable, Alert, TouchableOpacity } from 'react-native';
import { EMPTY_STRING } from '../../consts/GeneralConsts';
import { babyNameIsShort, babyNotInTheRightAge, usernameIsShort } from '../../consts/AlertMessegesConsts';
import { GlobalStyles } from '../../consts/styles';
import { Gender } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { doc, setDoc, db } from '../../firebase'
import { retrieveUserData } from '../../utils';
import { Collections } from '../../consts/firebaseConsts';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import CustomModal from '../CustomModal';
import AllergyList from '../AllergyList';
import { useDispatch } from 'react-redux';
import { setIsBabyInfoHasChanged } from '../../store/general';
declare module 'react-native-datepicker';

type Props = {
	onClose: () => void;
	babyInfo: any;
}

export default function UpdateBabyInfoModal({ onClose, babyInfo }: Props) {
	const [username, setUsername] = useState(EMPTY_STRING);
	const [errorMessage, setErrorMessage] = useState(EMPTY_STRING);
	const [babyName, setBabyName] = useState(EMPTY_STRING);
	const [birthdate, setBirthdate] = useState<string>(EMPTY_STRING);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isDateValid, setIsDateValid] = useState(true);
	const [isAllergyBabyModalOpen, setIsAllergyBabyModalOpen] = useState<boolean>(false)
	const [isAllergyBabyModalSaved, setIsAllergyBabyModalSaved] = useState<boolean>(false)
	const [selectedAllergies, setSelectedAllergies] = useState<boolean[]>(babyInfo?.selectedAllergies || [])
	const [Gender, setGender] = useState<Gender>(babyInfo?.gender === 'זכר' ? 'MALE' : 'FEMALE');

	const dispatch = useDispatch()

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
		try {
			if (!!errorMessage) {
				Alert.alert(babyNotInTheRightAge)
				return
			}
			const updatedInfo: any = {
				parentName: username,
				gender: Gender,
				babyBirthDate: birthdate,
				babyName,
				selectedAllergies: isAllergyBabyModalSaved ? selectedAllergies : EMPTY_STRING
			}
			Object.keys(updatedInfo || {}).forEach((key: string) => {
				if (updatedInfo[key] === "") {
					delete updatedInfo[key]
				}
			})
			const uid = await retrieveUserData()
			if (uid) {
				const docRef = doc(db, Collections.users, uid);
				await setDoc(docRef, updatedInfo, { merge: true });
				dispatch(setIsBabyInfoHasChanged({ isBabyInfoHasChanged: true }))
			}
			onClose()
		} catch (error) {
			Alert.alert('אופס, נסה שוב מאוחר יותר')
		}
	}

	const onModalSave = () => {
		setIsAllergyBabyModalSaved(true)
		setIsAllergyBabyModalOpen(false)
	}

	const onModalClose = () => {
		setIsAllergyBabyModalSaved(false)
		setIsAllergyBabyModalOpen(false)
	}

	const toggleAllergy = (allergyId: number) => {
		const updatedState = [...selectedAllergies]
		updatedState[allergyId] = !updatedState[allergyId]
		setSelectedAllergies(updatedState)
	};

	return (
		<View style={styles.container}>
			<View style={styles.head}>
				<Text style={[GlobalStyles.titleTextStyle, { color: '#B7C4CF' }]}>עריכת פרופיל</Text>
			</View>

			<View style={GlobalStyles.inputContainerStyle as any}>
				<TextInput
					style={[GlobalStyles.inputStyle, { borderColor: 'white', textAlign: 'right' }]}
					placeholder={babyInfo.parentName}
					value={username}
					onChangeText={setUsername}
				/>
			</View>
			<View style={GlobalStyles.inputContainerStyle as any}>
				<TextInput
					style={[GlobalStyles.inputStyle, { borderColor: 'white', textAlign: 'right' }]}
					placeholder={babyInfo.babyName}
					value={babyName}
					onChangeText={setBabyName}

				/>
			</View>

			<View style={GlobalStyles.inputContainerStyle as any}>
				<TextInput
					style={[GlobalStyles.inputStyle, { borderColor: 'white', textAlign: 'right' }]}
					placeholder={babyInfo.babyBirthDate}
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
			<TouchableOpacity onPress={() => setIsAllergyBabyModalOpen(true)} style={styles.updateButton}>
				<Text style={[GlobalStyles.buttonLightTextStyle, { color: '#95BDFF' }]}>רגישויות לתינוק/ת </Text>
			</TouchableOpacity>
			{isAllergyBabyModalOpen && (
				<CustomModal onClose={() => setIsAllergyBabyModalOpen(false)} visible={isAllergyBabyModalOpen} animationType='fade' transparent>
					<AllergyList
						onSave={onModalSave}
						onClose={onModalClose}
						toggleAllergy={toggleAllergy}
						selectedAllergies={selectedAllergies}
					/>
				</CustomModal>
			)}




			<View style={styles.gender}>
				<Pressable onPress={() => setGender('MALE')} style={[styles.genderButton, Gender === 'MALE' && { backgroundColor: '#DFF6FF' }]}>
					<Ionicons style={styles.genderIcon} name="male-outline" size={24} color="#63a5c5" />
				</Pressable>
				<Pressable onPress={() => setGender('FEMALE')} style={[styles.genderButton, Gender === 'FEMALE' && { backgroundColor: '#FFD6EC' }]}>
					<Ionicons style={styles.genderIcon} name="female-outline" size={24} color="#FF8DC7" />
				</Pressable>
			</View>
			{!!errorMessage && <Text style={[GlobalStyles.errorText, { marginTop: 10 }]}>{errorMessage}</Text>}
			<Pressable style={styles.updateButton} onPress={updateUserInfoHandler}>
				<Text style={styles.updateButtonTitle}>שמור שינויים</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '80%',
		backgroundColor: '#ECF2FF',
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
		color: '#95BDFF',
		fontSize: 14,
		fontWeight: "400",
		marginBottom: 15
	},
	genderButton: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		marginHorizontal: 10,
		marginVertical: 15,
		borderRadius: 8
	},
	gender: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	genderIcon: {
		marginHorizontal: 10,
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
		backgroundColor: 'white',
		marginVertical: 10,
		borderRadius: 5
	},
	updateButtonTitle: {
		color: "#95BDFF",
		fontSize: 16
	}
});
