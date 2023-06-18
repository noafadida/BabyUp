import { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { collection, db, getDocs } from '../../firebase';
import { CATEGORIES, ARTICLES } from '../../../data';
import { ROUTES_NAMES } from '../../consts/Routes';
import { GlobalStyles } from '../../consts/styles';
import CategoryGrid from "../CategoryGrid";
import Article from '../../models/article';
import ArticleItem from '../Articles/ArticleItem';
import { Collections } from '../../consts/firebaseConsts';

export const HomeTab = ({ navigation, route }: any) => {
	const [articlesData, setArticlesData] = useState<any[]>([])
	const { TipsScreenName, articleScreenName, MealsOverViewScreenName } = ROUTES_NAMES;

	useEffect(() => {
		const fetchArticlesHandler = async () => {
			try {
				const collectionRef = collection(db, Collections.article);
				const querySnapshot = await getDocs(collectionRef);
				const articlesCollection: any[] = []
				querySnapshot.forEach((doc) => {
					articlesCollection.push(doc.data())
				});
				setArticlesData([...ARTICLES, ...articlesCollection])
			} catch (e) {
				console.log(e)
			}
		}
		fetchArticlesHandler()
	}, [])

	const renderCategoryItem = (itemData: any) => {
		const pressHandler = () => (
			navigation.navigate(MealsOverViewScreenName, { categoryId: itemData.item.id })
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
			<View style={styles.categories} >
				<FlatList
					data={CATEGORIES}
					keyExtractor={(item: any) => item.id}
					renderItem={renderCategoryItem}
					numColumns={2}
				/>
			</View>
			<View style={styles.newsItem}>
				<ArticleItem article={articlesData?.[articlesData?.length - 1]} />
			</View>
			<View style={styles.innerComponent}>
				<TouchableOpacity style={GlobalStyles.buttonLightPinkStyle} onPress={() => navigation.navigate(TipsScreenName)}>
					<Text style={GlobalStyles.buttonPinkTextStyle}> הטיפים שלנו</Text>
				</TouchableOpacity>
				<TouchableOpacity style={GlobalStyles.buttonLightStyle} onPress={() => navigation.navigate(articleScreenName, { articles: articlesData })}>
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