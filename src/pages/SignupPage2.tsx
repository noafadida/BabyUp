import React, { useState, FC } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ViewStyle } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { ROUTES_NAMES } from '../consts/Routes';
import { GlobalStyles } from '../consts/styles';

interface InputContainerStyle extends ViewStyle {
	marginVertical?: number;
}


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
		setDateValid(true)
		setBirthdate(birthdayValue);
	};

	const handleBabyNameChange = (babyNameValue: any) => {
		setBabyName(babyNameValue);
		setNameValid(babyNameValue.length >= 2 ? true : false)
	};


	const validateFields = () => {
		if (dateValid && nameValid) {
			navigation.navigate(LoginPage)
			return;
		};
		Alert.alert("שגיאה", "יש לנסות שוב ולמלא את הפרטים כנדרש")
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
					value={birthdate.toDateString()}
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
						onDateChange={(newDate: string) => {
							const date = new Date(newDate); // Convert string to Date object
							setBirthdate(date);
							handleBirthday(date)
						}}

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
			<TouchableOpacity style={GlobalStyles.buttonPinkStyle} onPress={validateFields}>
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
		fontWeight: "400"
	}
});

export default SignupPage;