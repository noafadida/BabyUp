import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Alert } from 'react-native'
import { GlobalStyles } from '../consts/styles';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { db, doc, setDoc } from '../firebase'
import { BackendError } from '../consts/AlertMessegesConsts';
import { aboutUsDefaultValue } from '../consts/aboutUsConsts';
import { setIsBioChanged } from '../store/redux/general';
import { useDispatch } from 'react-redux';

const EditAboutUsScreen = () => {
	const [topBio, setTopBio] = useState(EMPTY_STRING); // put the current bio as a default value
	const [bottomBio, setBottomBio] = useState(EMPTY_STRING); // put the current bio as a default value
	const dispatch = useDispatch()

	const saveBioToDB = async (toDefault: boolean) => {
		try {
			const top = toDefault ? `${aboutUsDefaultValue.one} ${aboutUsDefaultValue.two} ${aboutUsDefaultValue.three} ${aboutUsDefaultValue.four}` : topBio
			const bottom = toDefault ? aboutUsDefaultValue.five : bottomBio
			const docRef = doc(db, "bio", 'description');
			await setDoc(docRef, { top, bottom }, { merge: true });
			dispatch(setIsBioChanged({ isBioChanged: true }))
			Alert.alert('המידע נשמר בהצלחה!')
		} catch (error) {
			console.log(error)
			Alert.alert(BackendError)
		}
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.descriptionInput}
				placeholder="ערוך חלק עליון"
				value={topBio}
				onChangeText={setTopBio}
			/>
			<TextInput
				style={styles.descriptionInput}
				placeholder="ערוך חלק תחתון"
				value={bottomBio}
				onChangeText={setBottomBio}
			/>
			<TouchableOpacity style={{ backgroundColor: 'aliceblue', padding: 20, borderRadius: 10 }} onPress={() => saveBioToDB(false)}>
				<Text>שמור</Text>
			</TouchableOpacity>
			<TouchableOpacity style={{ backgroundColor: 'aliceblue', padding: 20, borderRadius: 10 }} onPress={() => saveBioToDB(true)}>
				<Text>החזר למקור</Text>
			</TouchableOpacity>
		</View>
	)
}

export default EditAboutUsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.appBodyBackColor,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 30
	},
	descriptionInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		color: "#B7B7B7",
		borderRadius: 10,
		padding: 10,
		width: "95%",
		minHeight: 100,
		marginBottom: 20,
		marginTop: 20,
		textAlignVertical: "top",
		textAlign: "right"
	},
})