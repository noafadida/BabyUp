import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native'
import React from 'react';

const MealItem = ({ title, imageUrl, duration, complexity, affordability }: any) => {
	return (
		<View style={styles.mealItem}>
			<Pressable
				android_ripple={{ color: "#ccc" }}
				style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
			>
				<View style={styles.innerContainer}>
					<View>
						<Image source={{ uri: imageUrl }} style={styles.image} />
						<Text style={styles.title}>{title}</Text>
					</View>
					<View style={styles.details}>
						<Text style={styles.detailItem}>{duration} דקות</Text>
						<Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
						<Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
					</View>

				</View>
			</Pressable>
		</View >
	)
}
export default MealItem

const styles = StyleSheet.create({
	mealItem: {
		margin: 16,
		borderRadius: 4,
		backgroundColor: 'white',
		elevation: 4,
		shadowColor: "#8D7B68",
		shadowOpacity: 0.25,
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
		height: 200,
		opacity: 0.9,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		letterSpacing: 0.3,
		textAlign: "center",
		marginTop: 7,
		// color:"white"
	},
	details: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
		justifyContent: "center"
	},
	detailItem: {
		marginHorizontal: 45,
		fontSize: 14,
		color: "#AAAAAA",
	},
	buttonPressed: {
		opacity: 0.4,
	},
})