import { useEffect, useLayoutEffect, useState } from 'react';
import { CATEGORIES, MEALS } from '../../data';
import { View, Text, Image, StyleSheet } from 'react-native';
import { db, collection, getDocs } from '../firebase'
import { setAllMeals } from '../store/redux/general';
import { useDispatch, useSelector } from 'react-redux';
import { Collections } from '../consts/firebaseConsts';
import FilteredList from './MealList/FilteredList';

type Props = {
	route: any;
	navigation: any;
}

const MealsOverViewScreen = ({ route, navigation }: Props) => {
	const [diaplayMeals, setDiaplayMeals] = useState<any[]>([])
	const catId = route.params.categoryId
	const dispatch = useDispatch()
	const allMealsData = useSelector((state: any) => state.general.allMeals)

	useEffect(() => {
		const fetchMeals = async () => {
			try {
				const collectionRef = collection(db, Collections.meals);
				const querySnapshot = await getDocs(collectionRef);
				const mealsCollection: any[] = []
				querySnapshot.forEach((doc) => {
					mealsCollection.push(doc.data())
				});
				dispatch(setAllMeals({ allMeals: [...MEALS, ...mealsCollection] }))
			} catch (e) {
				console.log(e)
			}
		}
		if (allMealsData?.length === 0 || Object.keys(allMealsData || {})?.length === 0) {
			fetchMeals()
		}
	}, [])

	useEffect(() => {
		if (allMealsData?.length > 0) {
			const updatedMeals = catId === 'c4' ? allMealsData : allMealsData?.filter((mealItem: any) => mealItem?.categoryIds?.indexOf(catId) >= 0)
			setDiaplayMeals(updatedMeals)
		}
	}, [allMealsData])

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