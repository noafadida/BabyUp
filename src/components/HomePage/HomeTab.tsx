import { View, FlatList, StyleSheet, TouchableOpacity, Text,Image } from 'react-native'
import { CATEGORIES } from '../../../data';
import CategoryGrid from "../CategoryGrid";
import { ROUTES_NAMES } from '../../consts/Routes';
import { GlobalStyles } from '../../consts/styles';

export const HomeTab = ({ navigation, route }: any) => {
	const { MealsOverViewScreen } = ROUTES_NAMES

	const renderCategoryItem = (itemData: any) => {
		const pressHandler = () => (
			navigation.navigate(MealsOverViewScreen, { categoryId: itemData.item.id })
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
			<Image source={require('../../../assets/babyUp5.png')} style={styles.image} />
			<View style={styles.innerComponent}>
				<TouchableOpacity style={GlobalStyles.buttonLightPinkStyle}>
					<Text style={GlobalStyles.buttonPinkTextStyle}> הטיפים שלנו</Text>
				</TouchableOpacity>
				<TouchableOpacity style={GlobalStyles.buttonLightStyle}>
					<Text style={GlobalStyles.buttonLightTextStyle}>כתבות חדשות</Text>
				</TouchableOpacity>
			</View>
			


		</View >
	)
};

const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 200,
		resizeMode: "contain",
		alignSelf: "flex-end",
		// alignItems: "center",
		// justifyContent:"center",
		marginTop: 20,
		marginRight:40
	},
	screen: {
		flex: 1,
		justifyContent: "center",
		// height: "100%",
		// alignItems: "center",
		backgroundColor: GlobalStyles.colors.appBodyBackColor,
	},
	innerComponent: {
		flexDirection: 'row',
		gap: 10,
		marginBottom: 20,
		marginTop: 45,
		justifyContent: "center",
	},
});