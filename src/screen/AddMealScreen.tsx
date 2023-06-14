import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native'
import { storage, uploadBytes, ref, doc, db, setDoc } from '../firebase';
import { CATEGORIES, COMPLEXITY, MINUTES } from '../consts/AddMealsPageConsts';
import { GlobalStyles } from '../consts/styles';
import { Allergies } from '../consts';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { Allergy } from '../types';
import { useSelector } from 'react-redux';
import { Collections } from '../consts/firebaseConsts';
import { BackendError } from '../consts/AlertMessegesConsts';
import DropDown from '../components/DropDown';
import CustomModal from '../components/CustomModal';
import AllergyList from '../components/AllergyList';
import ImagePicker from '../components/ImagePicker';

const AddMealScreen = () => {
	const [title, setTitle] = useState(EMPTY_STRING);
	const [ingredients, setIngredients] = useState(EMPTY_STRING);
	const [steps, setSteps] = useState(EMPTY_STRING);
	const [isAllergyModalOpen, setIsAllergyModalOpen] = useState<boolean>(false)
	const [selectedAllergies, setSelectedAllergies] = useState<string[]>([])
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])

	const { newMealLevelDropdown, newMealTimeDropdown, imageBlob } = useSelector((state: any) => state.general);

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
			if (imageBlob) {
				const storageRef = ref(storage, id);
				await uploadBytes(storageRef, imageBlob)
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
			const docRef = doc(db, Collections.meals, title);
			await setDoc(docRef, data);
			Alert.alert('הוספת מתכון חדש!')
		} catch (error) {
			Alert.alert(BackendError)
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
				<ImagePicker />
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

export default AddMealScreen;

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

