import React, { FC, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { MEALS } from '../../data';
import { addFavorite, removeFavorite } from '../store/redux/favorites';
import { GlobalStyles } from '../consts/styles';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetails/Subtitle';
import List from '../components/MealDetails/List';
import IconButton from '../components/IconButton';
import StarRating from 'react-native-star-rating';



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
			<Text style={styles.title}> {selectedMeal.title} </Text>
			<MealDetails
				duration={selectedMeal.duration}
				affordability={selectedMeal.affordability}
				complexity={selectedMeal.complexity}
			/>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<StarRating
					disabled={false}
					maxStars={5}
					fullStarColor={GlobalStyles.colors.mealNameTitle}
					emptyStarColor={GlobalStyles.colors.mealNameTitle}
					starSize={28}
					rating={starCount}
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
	title: {
		fontWeight: "500",
		fontSize: 18,
		margin: 8,
		textAlign: "center",
		color: GlobalStyles.colors.mealNameTitle
	},
	listOuterContainer: {
		alignItems: "center",
	},
	listContainer: {
		width: '80%',
	}
})
