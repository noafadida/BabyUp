import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { CATEGORIES, ARTICLES } from '../../../data';
import { ROUTES_NAMES } from '../../consts/Routes';
import { GlobalStyles } from '../../consts/styles';
import CategoryGrid from "../CategoryGrid";
import Article from '../../models/article';
import NewsItem from '../NewsList/NewsItem';

export const HomeTab = ({ navigation, route }: any) => {
	const { MealsOverViewScreen, newsScreen, TipsScreen } = ROUTES_NAMES
	const newArticle: Article[] = ARTICLES.filter((article) => article.id === 'a1')

	const itemProps = {
		id: newArticle[0].id,
		imageUrl: newArticle[0].imageUrl,
		title: newArticle[0].title,
		subTitle: newArticle[0].subTitle,
		content: newArticle[0].content
	}

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

	const newsPressHandler = () => {
		navigation.navigate(newsScreen)
	}

	const tipsPressHandler = () => {
		navigation.navigate(TipsScreen)
	}

	return (
		<View style={styles.screen} >
			<View style={styles.categories} >
				<FlatList
					data={CATEGORIES}
					keyExtractor={(item: any) => item.id}
					renderItem={renderCategoryItem}
					numColumns={2}
				/>
			</View>
			<View style={styles.newsItem}>
				<NewsItem navigation={navigation} {...itemProps} />
			</View>
			<View style={styles.innerComponent}>
				<TouchableOpacity style={GlobalStyles.buttonLightPinkStyle} onPress={tipsPressHandler}>
					<Text style={GlobalStyles.buttonPinkTextStyle}> הטיפים שלנו</Text>
				</TouchableOpacity>
				<TouchableOpacity style={GlobalStyles.buttonLightStyle} onPress={newsPressHandler}>
					<Text style={GlobalStyles.buttonLightTextStyle}>כתבות חדשות</Text>
				</TouchableOpacity>
			</View>
		</View >
	)
};

const styles = StyleSheet.create({

	screen: {
		flex: 1,
		justifyContent: "space-around",
		paddingHorizontal: 25,
		paddingVertical: 30,
		backgroundColor: GlobalStyles.colors.appBodyBackColor,
	},
	categories: {
		flex: 0.5,
		paddingTop: 50,
	},
	innerComponent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: "flex-start",
		justifyContent: "space-around",
	},
	newsItem: {
		paddingTop: 30,
		justifyContent: 'flex-end',
		opacity: 0.9
	}
});