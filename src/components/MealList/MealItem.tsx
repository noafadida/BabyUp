import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native'
import React, { FC } from 'react';
import { ROUTES_NAMES } from '../../consts/Routes';
import MealDetails from '../MealDetails';
import { GlobalStyles } from '../../consts/styles';

const MealItem: FC<{ navigation: any }> = ({ id, title, imageUrl, duration, complexity, affordability, navigation }: any) => {
	const selectMealItemHandler = () => {
		navigation.navigate("MealDetailScreen", {
			mealId: id
		})
	};

	return (
		<View style={styles.mealItem}>
			<Pressable
				android_ripple={{ color: "#ccc" }}
				style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
				onPress={selectMealItemHandler}
			>
				<View style={styles.innerContainer}>
					<View>
						<Image source={{ uri: imageUrl }} style={styles.image} />
						<Text style={styles.title}>{title}</Text>
					</View>
					<MealDetails
						duration={duration}
						affordability={affordability}
						complexity={complexity}
					/>
				</View>
			</Pressable>
		</View >
	)
}
export default MealItem

const styles = StyleSheet.create({
	mealItem: {
		marginVertical: 12,
		marginHorizontal: 15,
		borderRadius: 4,
		backgroundColor: '#f3e7e4',
		elevation: 4,
		shadowColor: "#ceb5a7",
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		overflow: Platform.OS === 'android' ? "hidden" : 'visible'
	},
	innerContainer: {
		borderRadius: 4,
		overflow: 'hidden',
	},
	image: {
		width: "100%",
		height: 200
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		letterSpacing: 0.3,
		textAlign: "center",
		marginTop: 7,
		color: GlobalStyles.colors.mealNameTitle
	},
	buttonPressed: {
		opacity: 0.7,
	},

})