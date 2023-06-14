import { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from '../../consts/styles';
import { fetchFavoriteMeals } from '../../utils';
import MealList from '../MealList/MealList';

type Props = {
	navigation: any;
}

const FavoritesTab = ({ navigation }: Props) => {
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
				<MealList items={favoriteMeals} />
			)}
		</>
	)
}

export default FavoritesTab;

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