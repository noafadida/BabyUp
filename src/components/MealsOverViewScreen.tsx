import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { CATEGORIES } from '../../data';
import { View, Text, Image, StyleSheet } from 'react-native';
import { db, collection, getDocs } from '../firebase'
import { allMeals } from '../store/redux/general';
import { useDispatch, useSelector } from 'react-redux';
import FilteredList from './MealList/FilteredList';

const MealsOverViewScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
	const [diaplayMeals, setDiaplayMeals] = useState<any[]>([])
	const catId = route.params.categoryId
	const dispatch = useDispatch()
	const allMealsData = useSelector((state: any) => state.general.allMeals)

	useEffect(() => {
		setDiaplayMeals(catId === 'c4' ? allMealsData : allMealsData.filter((mealItem: any) => { return mealItem?.categoryIds?.indexOf(catId) >= 0 }))
	}, [allMealsData])

	useEffect(() => {
		const fetchMeals = async () => {
			try {
				const collectionRef = collection(db, "meals");
				const querySnapshot = await getDocs(collectionRef);
				const mealsCollection: any[] = []
				querySnapshot.forEach((doc) => {
					mealsCollection.push(doc.data())
				});
				dispatch(allMeals({ allMeals: mealsCollection }))
			} catch (e) {
				console.log(e)
			}
		}
		if (allMealsData?.length === 0) {
			fetchMeals()
		}
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