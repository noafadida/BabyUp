import { FC, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from '../../consts/styles';
import { fetchFavoriteMeals } from '../../utils';
import MealList from '../MealList/MealList';

export const FavoritesTab: FC<{ navigation: any, route: any }> = ({ navigation, route }: any) => {
	const favoriteMeals: any = useSelector((state: any) => state.favoriteMeals.mealsValues);
	const dispatch = useDispatch()

	useEffect(() => {
		if (favoriteMeals?.length === 0) {
			fetchFavoriteMeals(dispatch)
		}
	}, [])

	return (
		<>
			{favoriteMeals.length === 0 ? (
				<View style={styles.rootContainer}>
					<Text style={styles.text}>You have no favorite meals yet.</Text>
				</View>
			) : (
				<MealList items={favoriteMeals} navigation={navigation} />
			)}
		</>
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