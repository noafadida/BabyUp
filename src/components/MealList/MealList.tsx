import { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { GlobalStyles } from '../../consts/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteMeals } from '../../utils';
import MealItem from './MealItem';

type Props = {
	items: any;
}

const MealList = ({ items }: Props) => {
	const favoriteMealIds: any = useSelector((state: any) => state.favoriteMeals.mealsIds);
	const dispatch = useDispatch()

	useEffect(() => {
		if (favoriteMealIds?.length === 0) {
			fetchFavoriteMeals(dispatch)
		}
	}, [])

	const renderMealItem = (itemData: any) => {
		const item = itemData.item
		return <MealItem item={item} />
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={items}
				keyExtractor={(item): any => item.id}
				renderItem={renderMealItem}
			/>
		</View>
	)
}

export default MealList

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: GlobalStyles.colors.mealsBackColor
	},
})