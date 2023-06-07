import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Pressable, Alert } from 'react-native'
import { GlobalStyles } from '../consts/styles';
import { Ionicons } from '@expo/vector-icons';
import { Allergies } from '../consts';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { Allergy } from '../types';
import { useSelector } from 'react-redux';
import { retrieveUserData } from '../utils';
import { storage, uploadBytes, ref, doc, db, setDoc } from '../firebase';
import { useCameraPermissions, PermissionStatus, launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker'
import { CATEGORIES, COMPLEXITY, MINUTES } from '../consts/AddMealsPageConsts';
import DropDown from '../components/DropDown';
import CustomModal from '../components/CustomModal';
import AllergyList from '../components/AllergyList';

const AddMealPage = () => {
	const [imgUri, setImgUri] = useState<Blob>();
	const [title, setTitle] = useState(EMPTY_STRING);
	const [ingredients, setIngredients] = useState(EMPTY_STRING);
	const [steps, setSteps] = useState(EMPTY_STRING);
	const [isAllergyModalOpen, setIsAllergyModalOpen] = useState<boolean>(false)
	const [selectedAllergies, setSelectedAllergies] = useState<string[]>([])
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])

	const { newMealLevelDropdown, newMealTimeDropdown } = useSelector((state: any) => state.general);

	const [pickedImage, setPickedImage] = useState<string>(EMPTY_STRING);
	const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

	const verifyPermission = async () => {
		if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();
			return permissionResponse.granted
		}
		if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
			return false
		}
		return true
	}

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermission();

		if (!hasPermission) {
			return
		}
		const { assets } = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5
		})
		const imageUri = assets?.[0]?.uri;
		imageUri && handleConvertImageToBlob(imageUri)
	}

	const pickImageHandler = async () => {
		const result = await launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5
		});

		if (!result.canceled) {
			const imageUri = result.assets?.[0]?.uri
			imageUri && handleConvertImageToBlob(imageUri)
		} else {
			Alert.alert('You did not select any image.');
		}
	};

	const handleConvertImageToBlob = async (imageUri: string) => {
		const response = await fetch(imageUri)
		const blob = await response.blob()
		setImgUri(blob)
		setPickedImage(imageUri)
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
			const id = new Date().getTime().toString()
			const uid = await retrieveUserData()
			if (imgUri) {
				const storageRef = ref(storage, id);
				await uploadBytes(storageRef, imgUri)
			}
			const data = {
				id,
				title,
				ingredients,
				steps,
				allergies: selectedAllergies,
				duration: newMealTimeDropdown,
				complexity: newMealLevelDropdown,
				categoryIds: selectedCategories
			}
			if (uid) {
				const docRef = doc(db, "meals", title);
				await setDoc(docRef, data);
				Alert.alert('הוספת מתכון חדש!')
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	const handlePressedCategory = (itemId: string) => {
		const isChecked = selectedCategories.includes(itemId);
		setSelectedCategories(isChecked ? selectedCategories.filter((id) => id !== itemId) : [...selectedCategories, itemId]);
	}

	return (
		<ScrollView style={{ backgroundColor: GlobalStyles.colors.appBodyBackColor, }} >
			<View style={styles.container}>
				<TouchableOpacity onPress={pickImageHandler}>
					<Ionicons name={"image"} style={styles.galleryButton} size={40} />
					<View style={styles.imageContainer}>
						{pickedImage ? (
							<Image source={{ uri: pickedImage }} style={styles.image} />
						) : (
							<Text style={styles.choosePhotoText}>העלה תמונה </Text>
						)}
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={takeImageHandler}>
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
				<View style={styles.categories}>
					{CATEGORIES?.map((item: any) => {
						const isChecked = selectedCategories.includes(item.id)
						return (
							<Pressable key={item.id} style={styles.category} onPress={() => handlePressedCategory(item.id)}>
								<Text style={[styles.categoryText, isChecked && styles.checkedCategory]}>{item.name}</Text>
							</Pressable>
						)
					})}
				</View>

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
							<AllergyList onClose={() => setIsAllergyModalOpen(false)} toggleAllergy={toggleAllergy} selectedAllergies={selectedAllergies} />
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
	categories: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginBottom: 20
	},
	category: {
		backgroundColor: "#FF8DC7",
		paddingVertical: 10,
		flex: 0.3,
		borderRadius: 5
	},
	categoryText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 16
	},
	checkedCategory: {
		color: '#b41cb1'
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

