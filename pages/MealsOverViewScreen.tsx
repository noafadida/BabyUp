import React, { FC } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { MEALS } from '../data';
import MealItem from '../components/MealItem';

const MealsOverViewScreen: FC<{ route: any }> = ({ route }) => {
	const catergoryId = route.params.categoryId
	console.log('MealsOverViewScreen render')
	const diaplayMeals = MEALS.filter((mealItem) => { return mealItem.categoryIds.indexOf(catergoryId) >= 0 })

	const renderMealItem = (itemData: any) => (
		<MealItem
			title={itemData.item.title}
			imageUrl={itemData.item.imageUrl}
			duration={itemData.item.duration}
			complexity={itemData.item.complexity}
			affordability={itemData.item.affordability}
		/>
	)

	return (
		<View style={styles.container}>
			<FlatList
				data={diaplayMeals}
				keyExtractor={(item): any => item.id}
				renderItem={renderMealItem}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16
	}
}
)
export default MealsOverViewScreen;