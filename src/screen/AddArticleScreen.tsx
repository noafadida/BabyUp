import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { GlobalStyles } from '../consts/styles';
import { useSelector } from 'react-redux';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { db, doc, ref, setDoc, storage, uploadBytes } from '../firebase';
import { Collections } from '../consts/firebaseConsts';
import { BackendError } from '../consts/AlertMessegesConsts';
import ImagePicker from '../components/ImagePicker';

const AddArticleScreen = () => {
	const [articleTitle, setArticleTitle] = useState(EMPTY_STRING);
	const [articleSubTitle, setArticleSubTitle] = useState(EMPTY_STRING);
	const [articleContent, setArticleContent] = useState(EMPTY_STRING);

	const { imageBlob } = useSelector((state: any) => state.general);

	const handleAddArticle = async () => {
		try {
			const id = new Date().getTime().toString()
			if (imageBlob) {
				const storageRef = ref(storage, id);
				await uploadBytes(storageRef, imageBlob)
			}
			const data = {
				id,
				title: articleTitle,
				subTitle: articleSubTitle,
				content: articleContent
			}
			const docRef = doc(db, Collections.article, articleTitle);
			await setDoc(docRef, data);
			Alert.alert('הוספת כתבה חדש!')
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
					value={articleTitle}
					onChangeText={setArticleTitle}
				/>
				<TextInput
					style={styles.nameInput}
					placeholder="כותרת משנית"
					value={articleSubTitle}
					onChangeText={setArticleSubTitle}
				/>
				<TextInput
					style={styles.descriptionInput}
					placeholder="הכנס תוכן"
					value={articleContent}
					onChangeText={setArticleContent}
				/>

				<TouchableOpacity onPress={handleAddArticle} style={[GlobalStyles.buttonLightStyle, { marginBottom: 30 }]}>
					<Text style={[GlobalStyles.buttonPinkTextStyle, { color: '#FF8DC7' }]}>הוספה</Text>
				</TouchableOpacity>
			</View>
		</ScrollView >
	);
};

export default AddArticleScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: GlobalStyles.colors.appBodyBackColor,
		alignItems: "center",
		justifyContent: "space-around",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	imageContainer: {
		margin: 10,
		width: "40%",
		borderWidth: 1,
		borderColor: "#ccc",
		color: "#B7B7B7",
		aspectRatio: 1,
		borderRadius: 10,
		overflow: "hidden",
		marginBottom: 30,
		alignContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	galleryButton: {
		position: "absolute",
		flexDirection: "row",
		margin: 65,
		color: "#FF8DC7",
	},
	choosePhotoText: {
		fontSize: 14,
		margin: 30,
		color: "#ccc",
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
		textAlignVertical: "top",
		textAlign: "right",
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
		textAlign: "right",

	},
	TextInput: {
		color: "white",
	},
})