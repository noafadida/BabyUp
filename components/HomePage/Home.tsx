import { View, FlatList, StyleSheet } from 'react-native'
import CategoryGrid from "../CategoryGrid";
import { CATEGORIES } from '../../data';
import { Text } from 'react-native';

export const HomeScreen = ({ navigation }: any) => {
	// console.log('HomeScreen render')

	const renderCategoryItem = (itemData: any) => {
		const pressHandler = () => (
			navigation.navigate("MealsOverViewScreen", { categoryId: itemData.item.id, title: itemData.item.title, })
		)
		return (
			<CategoryGrid
				title={itemData.item.title}
				color={itemData.item.color}
				image={itemData.item.image}
				onPress={pressHandler}
			/>
		)
	}
	return (
		<View style={styles.screen} >
			<View >
				<FlatList
					data={CATEGORIES}
					keyExtractor={(item: any) => item.id}
					renderItem={renderCategoryItem}
				/>
			</View>
		</View >
	)
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		height:"100%",
		// backgroundColor: "black"
	},
});