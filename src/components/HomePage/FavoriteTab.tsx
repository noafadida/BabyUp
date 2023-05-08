import { StyleSheet, View, Text, Image } from 'react-native'
import { FC, } from 'react'
import MealList from '../MealList/MealList';
import { MEALS } from '../../../data';
import { useSelector } from 'react-redux';
import { GlobalStyles } from '../../consts/styles';

export const FavoritesTab: FC<{ navigation: any, route: any }> = ({ navigation, route }: any) => {

	const favoriteMealIds: any = useSelector((state: any) => state.favoriteMeals.ids);
	const favoriteMeals = MEALS.filter((meal) => favoriteMealIds.includes(meal.id))

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