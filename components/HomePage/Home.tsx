import { View, FlatList, StyleSheet } from 'react-native'
import { CATEGORIES } from '../../data';
import CategoryGrid from "../CategoryGrid";

export const HomeScreen = ({ navigation }: any) => {
	const renderCategoryItem = (itemData: any) => {
		const pressHandler = () => (
			navigation.navigate("MealsOverViewScreen", { categoryId: itemData.item.id, title: itemData.titleת })
		)
		return (
			<CategoryGrid
				title={itemData.item.title}
				color={itemData.item.color}
				onPress={pressHandler}
			/>
		)
	}
	return (
		<View style={styles.screen} >
			<FlatList
				data={CATEGORIES}
				keyExtractor={(item: any) => item.id}
				renderItem={renderCategoryItem}
			/>
		</View >
	)
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		justifyContent: 'center',
		backgroundColor: "white"
	}
});