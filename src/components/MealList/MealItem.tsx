import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native'
import React, { FC } from 'react';
import MealDetails from '../MealDetails';
import { GlobalStyles } from '../../consts/styles';

const MealItem: FC<{ navigation: any }> = ({ id, title, imageUrl, duration, complexity, navigation }: any) => {
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
		backgroundColor: 'white',
        shadowColor: "#ceb5a7",
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 1,
		overflow: Platform.OS === 'android' ? "hidden" : 'visible'
	},
	innerContainer: {
		overflow: 'hidden',
	},
	image: {
		width: "100%",
		height: 200
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		letterSpacing: 0.4,
		textAlign: "center",
		marginTop: 7,
		color: GlobalStyles.colors.mealNameTitle
	},
	buttonPressed: {
		opacity: 0.9,
	},

})