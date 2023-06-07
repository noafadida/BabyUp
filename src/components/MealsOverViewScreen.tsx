import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { MEALS, CATEGORIES } from '../../data';
import MealList from './MealList/MealList';
import { View, Text, Image, StyleSheet } from 'react-native';
import FilteredList from './MealList/FilteredList';
import { getDoc, doc, db, collection, getDocs } from '../firebase'

const MealsOverViewScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
	const [meals, setMeals] = useState<any[]>([])
	const [diaplayMeals, setDiaplayMeals] = useState<any[]>([])
	const catId = route.params.categoryId

	useEffect(() => {
		setDiaplayMeals(catId === 'c4' ? meals : meals.filter((mealItem) => { return mealItem?.categoryIds?.indexOf(catId) >= 0 }))
	}, [meals])

	useEffect(() => {
		const fetchMeals = async () => {
			try {
				const collectionRef = collection(db, "meals");
				const querySnapshot = await getDocs(collectionRef);
				const mealsCollection: any[] = []
				querySnapshot.forEach((doc) => {
					mealsCollection.push(doc.data())
				});
				setMeals(mealsCollection)
			} catch (e) {
				console.log(e)
			}
		}
		fetchMeals()
	}, [])

	useLayoutEffect(() => {
		const categoryTitle = CATEGORIES.find((category) => category.id === catId)?.title
		navigation.setOptions({
			headerTitle: () => (
				<View style={styles.homeHeader}>
					<Text style={styles.text}>{categoryTitle}</Text>
					<Image
						source={require('../../assets/babyupLogoNew.png')}
						style={styles.image}
					/>
				</View>
			)
		})
	}, [catId, navigation])

	return (
		<FilteredList navigation={navigation} items={diaplayMeals} />
	)
}

const styles = StyleSheet.create({
	text: {
		color: "white",
		fontSize: 18,
		textAlignVertical: "center",
		marginBottom: 5,
		letterSpacing: 0.8,
		textAlign: "center",
	},
	image: {
		resizeMode: 'contain',
		height: 45,
		width: 45
	},
	homeHeader: {
		flexDirection: 'row',
		alignItems: 'center'
	},
})

export default MealsOverViewScreen;