import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { db, doc, ref, setDoc, storage, uploadBytes } from '../firebase'
import { GlobalStyles } from '../consts/styles';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { useSelector } from 'react-redux';
import { Collections } from '../consts/firebaseConsts';
import { BackendError } from '../consts/AlertMessegesConsts';
import ImagePicker from '../components/ImagePicker';

const AddTipScreen = () => {
	const [tipTitle, setTipTitle] = useState(EMPTY_STRING);
	const [tipSubTitle, setTipSubTitle] = useState(EMPTY_STRING);
	const [tipContent, setTipContent] = useState(EMPTY_STRING);

	const { imageBlob } = useSelector((state: any) => state.general);

	const handleAddTip = async () => {
		try {
			const id = new Date().getTime().toString()
			if (imageBlob) {
				const storageRef = ref(storage, id);
				await uploadBytes(storageRef, imageBlob)
			}
			const data = {
				id,
				title: tipTitle,
				subTitle: tipSubTitle,
				content: tipContent
			}
			const docRef = doc(db, Collections.tips, tipTitle);
			await setDoc(docRef, data);
			Alert.alert('הוספת טיפ חדש!')
		} catch (error) {
			Alert.alert(BackendError)
			console.log('error', error)
		}
	}

	return (
		<ScrollView style={{ backgroundColor: GlobalStyles.colors.appBodyBackColor, }} >
			<View style={styles.container}>
				<ImagePicker isShowTakeImage={false} />
				<TextInput
					style={styles.nameInput}
					placeholder="כותרת"
					value={tipTitle}
					onChangeText={setTipTitle}
				/>
				<TextInput
					style={styles.nameInput}
					placeholder="כותרת משנית"
					value={tipSubTitle}
					onChangeText={setTipSubTitle}
				/>
				<TextInput
					style={styles.descriptionInput}
					placeholder="הכנס תוכן"
					value={tipContent}
					onChangeText={setTipContent}
				/>
				<TouchableOpacity onPress={handleAddTip} style={[GlobalStyles.buttonLightStyle, { marginBottom: 30 }]}>
					<Text style={[GlobalStyles.buttonPinkTextStyle, { color: '#FF8DC7', }]}>הוספה</Text>
				</TouchableOpacity>
			</View>
		</ScrollView >
	);
};

export default AddTipScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: GlobalStyles.colors.appBodyBackColor,
		alignItems: "center",
		justifyContent: "space-around",
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	imageContainer: {
		margin: 10,
		width: "40%",
		aspectRatio: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		color: "#B7B7B7",
		borderRadius: 10,
		overflow: "hidden",
		marginBottom: 30,
		alignContent: "center",
		alignItems: "center"
	},
	image: {
		width: "100%",
		height: "100%"
	},
	galleryButton: {
		position: "absolute",
		flexDirection: "row",
		margin: 65,
		color: "#FF8DC7"
	},
	choosePhotoText: {
		fontSize: 14,
		margin: 30,
		color: "#ccc"
	},
	descriptionInput: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		color: "#B7B7B7",
		padding: 10,
		width: "95%",
		minHeight: 100,
		marginBottom: 20,
		textAlignVertical: "top",
		textAlign: "right"
	},
	nameInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		color: "#B7B7B7",
		borderRadius: 10,
		padding: 10,
		width: "95%",
		minHeight: 50,
		marginBottom: 20,
		textAlignVertical: "top",
		textAlign: "right"
	},
})