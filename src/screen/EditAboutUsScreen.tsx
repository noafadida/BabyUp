import { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Alert } from 'react-native'
import { GlobalStyles } from '../consts/styles';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { db, doc, setDoc } from '../firebase'
import { BackendError } from '../consts/AlertMessegesConsts';
import { aboutUsBottomDefaultValue, aboutUsTopDefaultValue } from '../consts/aboutUsConsts';
import { useDispatch } from 'react-redux';
import { Collections } from '../consts/firebaseConsts';
import { setIsBioChanged } from '../store/general';

const EditAboutUsScreen = () => {
	const [topBio, setTopBio] = useState(EMPTY_STRING); // TODO put the current bio as a default value
	const [bottomBio, setBottomBio] = useState(EMPTY_STRING); // TODO  put the current bio as a default value
	const dispatch = useDispatch()
	
	const saveBioToDB = async (toDefault: boolean) => {
		try {
			const bioValue = {
				top: toDefault ? aboutUsTopDefaultValue : topBio,
				bottom: toDefault ? aboutUsBottomDefaultValue : bottomBio
			}
			const docRef = doc(db, Collections.bio, Collections.description);
			await setDoc(docRef, bioValue, { merge: true });
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

			<View style={{flexDirection:'row' }} >
				<TouchableOpacity onPress={() => saveBioToDB(false)} style={[GlobalStyles.buttonLightStyle, { marginHorizontal:10}]}>
					<Text style={[GlobalStyles.buttonPinkTextStyle, { color: '#FF8DC7' }]}>שמור</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => saveBioToDB(true)} style={GlobalStyles.buttonLightStyle}>
					<Text style={[GlobalStyles.buttonPinkTextStyle, { color: '#FF8DC7' }]}>החזר למקור</Text>
				</TouchableOpacity>
			</View>

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