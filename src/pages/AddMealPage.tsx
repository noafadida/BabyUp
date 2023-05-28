import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { GlobalStyles } from '../consts/styles';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DropDown from '../components/DropDown';
import CustomModal from '../components/CustomModal';
import AllergyList from '../components/AllergyList';
import { Allergies } from '../consts';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { Allergy } from '../types';
import { useSelector } from 'react-redux';
import { retrieveUserData } from '../utils';
import { db, setDoc, doc } from '../firebase';

const MINUTES = [
	{ label: '5 דקות', value: 5 },
	{ label: '10 דקות', value: 10 },
	{ label: '15 דקות', value: 15 },
	{ label: '20 דקות', value: 20 },
	{ label: '25 דקות', value: 25 },
	{ label: '30 דקות', value: 30 },
	{ label: '35 דקות', value: 35 },
	{ label: '40 דקות', value: 40 },
	{ label: '45 דקות', value: 45 },
	{ label: '50 דקות', value: 50 },
	{ label: '55 דקות', value: 55 },
	{ label: '60 דקות', value: 60 },
	{ label: '65 דקות', value: 65 },
	{ label: '70 דקות', value: 70 },
	{ label: '75 דקות', value: 75 },
	{ label: '80 דקות', value: 80 },
	{ label: '85 דקות', value: 85 },
	{ label: '90 דקות', value: 90 },
];
const COMPLEXITY = [
	{ label: 'קל', value: 'קל' },
	{ label: 'קל-בינוני', value: 'קל-בינוני' },
	{ label: 'בינוני', value: 'בינוני' },
	{ label: 'קשה', value: 'קשה' },
	{ label: 'קשה מאוד', value: 'קשה מאוד' }
];



const AddMealPage = ({ duration, complexity, affordability, style, textStyle }: any) => {

	const [imgUri, setImgUri] = useState("");
	const [title, setTitle] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [steps, setSteps] = useState("");
	const [status, requestPermission] = ImagePicker.useCameraPermissions();
	const [isAllergyModalOpen, setIsAllergyModalOpen] = useState<boolean>(false)
	const [selectedAllergies, setSelectedAllergies] = useState<string[]>([])

	const { newMealLevelDropdown, newMealTimeDropdown } = useSelector((state: any) => state.general);

	const askPermission = async () => {
		try {
			if (status?.status === ImagePicker.PermissionStatus.UNDETERMINED) {
				const permissionRes = await requestPermission();
				return permissionRes.granted;
			}
			if (status?.status === ImagePicker.PermissionStatus.DENIED) {
				alert("camera permission required");
				return false;
			}
			return true;
		} catch (err) {
			console.log("ask permission failed ");
		}
	};


	const handleChoosePhoto = async () => {
		try {
			const res = await ImagePicker.launchImageLibraryAsync();
			if (!res.canceled && res.assets.length > 0) {
				const uri = res.assets[0].uri;
				setImgUri(uri);

			}
		} catch (err) {
			console.log("open camera error");
		}
		console.log(imgUri)
	};

	const handleTakePhoto = async () => {
		const isPermission = await askPermission();
		if (!isPermission) return;
		try {
			const res = await ImagePicker.launchCameraAsync();
			console.log(res);
			if (!res.canceled && res.assets.length > 0) {
				const uri = res.assets[0].uri;
				setImgUri(uri);
			}
		} catch (err) {
			console.log("open camera error");
		}
	};
	const onModalClose = () => {
		setIsAllergyModalOpen(false)
	}

	const toggleAllergy = (allergyId: string) => {
		if (selectedAllergies.includes(allergyId)) {
			setSelectedAllergies(selectedAllergies?.filter((id) => id !== allergyId));
		} else {
			setSelectedAllergies([...selectedAllergies, allergyId]);
		}
	};

	const getAllergyName = (id: string) => {
		const allergy: any = Allergies?.filter((item: Allergy) => item?.id === id)
		return allergy?.[0]?.name || EMPTY_STRING;
	}

	const handleAddMeal = async () => {
		try {

			const data = {
				imgUri,
				title,
				ingredients,
				steps,
				allergies: selectedAllergies,
				time: newMealTimeDropdown,
				level: newMealLevelDropdown
			}
			const uid = await retrieveUserData()
			if (uid) {
				const docRef = doc(db, "meals", title);
				await setDoc(docRef, data);
				console.log('success')
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<ScrollView style={{ backgroundColor: GlobalStyles.colors.appBodyBackColor, }} >
			<View style={styles.container}>
				<TouchableOpacity onPress={handleChoosePhoto}>
					<Ionicons name={"image"} style={styles.galleryButton} size={40} />
					<View style={styles.imageContainer}>
						{imgUri ? (
							<Image source={{ uri: imgUri }} style={styles.image} />
						) : (
							<Text style={styles.choosePhotoText}>העלה תמונה </Text>
						)}
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={handleTakePhoto}>
					<Ionicons name={"camera"} style={styles.cameraButton} size={40} />
					<Text style={styles.takePhotoText}>צלם עכשיו </Text>
				</TouchableOpacity>
				<TextInput
					style={styles.nameInput}
					placeholder="שם המתכון"
					value={title}
					onChangeText={setTitle}
				/>
				<TextInput
					style={styles.descriptionInput}
					placeholder="מצרכים למתכון (יש להפריד בין המצרכים בפסיקים)"
					value={ingredients}
					onChangeText={setIngredients}
				/>
				<TextInput
					style={styles.descriptionInput}
					placeholder="תאר את שלבי ההכנה (הפרד את השלבים באמצעות פסיקים)"
					value={steps}
					onChangeText={setSteps}
				/>

				<View style={styles.dropDownLine}>
					<View style={styles.dropDownItem}>
						<Text style={{ color: "white" }}> זמן הכנה</Text>
						<DropDown items={MINUTES} name='Time' />
					</View>

					<View style={styles.dropDownItem}>
						<Text style={{ color: "white" }}> רמת קושי</Text>
						<DropDown items={COMPLEXITY} name='Level' />
					</View>
				</View>

				<View style={{ backgroundColor: '#FF8DC7', paddingHorizontal: 15, paddingVertical: 2, borderRadius: 10 }}>
					<View style={styles.innerDetails}>
						<Text style={[styles.titleDetails, { color: "white", }]}>רגישויות :</Text>
						{selectedAllergies?.length > 0 && selectedAllergies.map((allergy: string) => {
							const name: string = getAllergyName(allergy)
							return (
								<Text key={allergy} style={styles.textDetails}>{name} </Text>
							)
						})}
					</View>



					<TouchableOpacity onPress={() => setIsAllergyModalOpen(true)} style={GlobalStyles.buttonLightStyle}>
						<Text style={[GlobalStyles.buttonLightTextStyle, { color: '#FF8DC7' }]}>ערוך רשימת אלגרנים</Text>
					</TouchableOpacity>
					{isAllergyModalOpen && (
						<CustomModal onClose={() => setIsAllergyModalOpen(false)} visible={isAllergyModalOpen} animationType='fade' transparent>
							<AllergyList onClose={onModalClose} toggleAllergy={toggleAllergy} selectedAllergies={selectedAllergies} />
						</CustomModal>
					)}

				</View>

				<TouchableOpacity style={[GlobalStyles.buttonLightStyle, { marginBottom: 30 }]} onPress={handleAddMeal}>
					<Text style={[GlobalStyles.buttonPinkTextStyle, { color: '#FF8DC7', }]}>הוספה</Text>
				</TouchableOpacity>
			</View>
		</ScrollView >
	);
};

export default AddMealPage;

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
		borderRadius: 10,
		overflow: "hidden",
		marginBottom: 20,
		alignContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	cameraButton: {
		position: "absolute",
		right: -30,
		color: "#FF8DC7",
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
	takePhotoText: {
		fontSize: 14,
		color: "#ccc",
		margin: 15
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
		marginVertical: 10,
		marginBottom: 20,
		textAlignVertical: "top",
		textAlign: "right",

	},
	dropDownItem: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		alignItems: "center",
		gap: 5,
		marginBottom: 5
	},
	dropDownLine: {
		flexDirection: 'row',
		backgroundColor: '#FF8DC7',
		borderRadius: 10,
		marginBottom: 20
	},
	textDetails: {
		fontSize: 18,
		color: "white"
	},
	titleDetails: {
		fontSize: 18,
		color: "#FF8DC7"
	},
	innerDetails: {
		flexDirection: "row-reverse",
		marginHorizontal: 20,
		gap: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

