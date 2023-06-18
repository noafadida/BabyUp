import { View, StyleSheet, FlatList } from 'react-native';
import { GlobalStyles } from '../../consts/styles';
import ArticleItem from './ArticleItem';

type Props = {
	articles: any;
}

const ArticleList = ({ articles }: Props) => {
	const renderArticlelItem = (itemData: any) => {
		const article = itemData.item
		return <ArticleItem article={article} />
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={articles}
				keyExtractor={(item): any => item.id}
				renderItem={renderArticlelItem}
			/>
		</View>
	)
}
export default ArticleList

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: GlobalStyles.colors.mealsBackColor
	},
})