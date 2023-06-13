import { FC } from 'react';
import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native'
import { GlobalStyles } from '../../consts/styles';
import { ROUTES_NAMES } from '../../consts/Routes';

const NewsItem: FC<{ navigation: any }> = ({ id, title, imageUrl, navigation }: any) => {
	const { ArticleDetailsScreenName } = ROUTES_NAMES;

	const selectArticleItemHandler = () => {
		navigation.navigate(ArticleDetailsScreenName, {
			id: id
		})
	};

	return (
		<View style={styles.item}>
			<Pressable
				android_ripple={{ color: "#ccc" }}
				style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
				onPress={selectArticleItemHandler}
			>
				<View style={styles.innerContainer}>
					<View>
						<Image source={{ uri: imageUrl }} style={styles.image} />
						<Text style={styles.title}>{title}</Text>
					</View>
				</View>
			</Pressable>
		</View >
	)
}
export default NewsItem

const styles = StyleSheet.create({
	item: {
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
		padding: 6,
		color: GlobalStyles.colors.mealNameTitle
	},
	buttonPressed: {
		opacity: 0.9,
	},

})