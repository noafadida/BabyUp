import { StyleSheet, View, Text, Image } from 'react-native'
import { FC, useEffect, useState } from 'react'
import MealList from '../MealList/MealList';
import { MEALS } from '../../../data';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from '../../consts/styles';
import { retrieveUserData } from '../../utils';
import { db, doc, getDoc } from '../../firebase'
import { updateState } from '../../store/redux/favorites';


export const FavoritesTab: FC<{ navigation: any, route: any }> = ({ navigation, route }: any) => {
	const favoriteMealIds: any = useSelector((state: any) => state.favoriteMeals.ids);
	const favoriteMeals = MEALS.filter((meal) => favoriteMealIds.includes(meal.id))

	const dispatch = useDispatch()

	useEffect(() => {
		const fetchFavoriteMeals = async () => {
			const uid = await retrieveUserData()
			if (uid) {
				const docRef = doc(db, 'favorite',uid);
				const getDocRef = await getDoc(docRef);
				const getDocRefData = getDocRef.data()
				const favoriteMealsData = Object.values(getDocRefData || {})
				dispatch(updateState({ ids: favoriteMealsData }))
			}
		}
		fetchFavoriteMeals()
	}, [])

	if (favoriteMeals.length === 0) {
		return (
			<View style={styles.rootContainer}>
				<Text style={styles.text}>You have no favorite meals yet.</Text>
			</View>
		)
	}
	return (
		<MealList items={favoriteMeals} navigation={navigation} route={route} />
	)
}
const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: "center",
		alignContent: 'center',
		backgroundColor: GlobalStyles.colors.appBodyBackColor
	},
	text: {
		fontSize: 18,
		fontWeight: "500",
		color: "pink",
		textAlign: "center"
	},
});