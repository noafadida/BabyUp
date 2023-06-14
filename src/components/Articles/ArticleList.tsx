import { View, StyleSheet, FlatList } from 'react-native';
import { GlobalStyles } from '../../consts/styles';
import ArticleItem from './ArticleItem';

type Props = {
	items: any;
}

const ArticleList = ({ items }: Props) => {
	const renderArticlelItem = (itemData: any) => {
		const item = itemData.item
		return <ArticleItem item={item} />
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={items}
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