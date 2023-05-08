import React, { FC, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { MEALS } from '../../data';
import { addFavorite, removeFavorite } from '../store/redux/favorites';
import { GlobalStyles } from '../consts/styles';
import Subtitle from '../components/MealDetails/Subtitle';
import List from '../components/MealDetails/List';
import IconButton from '../components/IconButton';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';



const MealDetailScreen: FC<{ route?: any, navigation?: any }> = ({ route, navigation }) => {
	const favoriteMealIds: any = useSelector((state: any) => state.favoriteMeals.ids)
	const dispatch = useDispatch();
	const [starCount, setStarCount] = useState(0);

	const onStarRatingPress = (rating: any) => {
		setStarCount(rating);
	};

	const mealId = route.params.mealId
	const selectedMeal: any = MEALS.find((meal) => meal.id === mealId)
	const mealIsFavorite = favoriteMealIds.includes(mealId)

	const changeFavoriteStatusHandler = () => {
		dispatch(mealIsFavorite ? removeFavorite({ id: mealId }) : addFavorite({ id: mealId }))
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title: selectedMeal.title,
			headerRight: () => {
				return (
					<IconButton
						icon={mealIsFavorite ? 'heart' : 'heart-outline'}
						color="white"
						onPress={changeFavoriteStatusHandler}
					/>)
			}
		})
	}, [selectedMeal, navigation, changeFavoriteStatusHandler])

	return (
		<ScrollView style={styles.container}>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={styles.time}>
				<Ionicons name='time-outline' size={22} color={GlobalStyles.colors.btnColor} />
				<Text style={{ color: "#AAAAAA" }}>{selectedMeal.duration} דקות </Text>
			</View>
			<View style={styles.allregyMeal} >
				<Text style={styles.allergyName}>
					גלוטן
					{selectedMeal.isGlutenFree ? <Ionicons name="close" size={18} color="white" /> : <Ionicons name="checkmark" size={18} color="white" />}
				</Text>
				<Text style={styles.allergyName}>
					חלב
					{selectedMeal.isMilkFree ? <Ionicons name="close" size={18} color="white" /> : <Ionicons name="checkmark" size={18} color="white" />}
				</Text>
				<Text style={styles.allergyName}>
					אגוזים
					{selectedMeal.isNutsFree ?
						<Ionicons name="close" size={18} color="white" /> : <Ionicons name="checkmark" size={18} color="white" />}
				</Text>
				<Text style={styles.allergyName}>
					ביצים
					{selectedMeal.isEggsFree ? <Ionicons name="close" size={18} color="white" /> : <Ionicons name="checkmark" size={18} color="white" />}
				</Text>
			</View>


			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<StarRating
					disabled={false}
					maxStars={5}
					starStyle={{ margin: 7 }}
					fullStarColor={GlobalStyles.colors.headerBackColor}
					emptyStarColor={GlobalStyles.colors.headerBackColor}
					starSize={18}
					rating={starCount}
					animation='flash'
					selectedStar={(rating: any) => onStarRatingPress(rating)}
				/>
			</View>


			<View style={styles.listOuterContainer}>
				<View style={styles.listContainer}>
					<Subtitle>מצרכים</Subtitle>
					<List data={selectedMeal.ingredients} />
					<Subtitle>שלבים</Subtitle>
					<List data={selectedMeal.steps} />
				</View>
			</View>
		</ScrollView >
	)
}

export default MealDetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: GlobalStyles.colors.mealsBackColor,
	},
	image: {
		width: "100%",
		height: 280,
	},
	listOuterContainer: {
		alignItems: "center",
		marginBottom: 20
	},
	listContainer: {
		width: '80%',
	},
	allergyName: {
		fontSize: 12,
		textAlign: "center",
		color: "white",
	},
	allregyMeal: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		gap: 10,
		justifyContent: "center",
		backgroundColor: "pink",
		paddingVertical: 2,
		paddingHorizontal: 12,
		marginBottom: 10,
		alignSelf: "center",
		borderRadius: 20,
	},
	time: {
		flexDirection: "row-reverse",
		alignItems: "center",
		alignSelf: "flex-end",
		paddingBottom: 7,
		margin: 10,
		gap: 4
	},
})
