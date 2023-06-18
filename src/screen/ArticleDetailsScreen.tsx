import { useLayoutEffect } from 'react';
import { StyleSheet, Text, Image, ScrollView } from 'react-native';
import { GlobalStyles } from '../consts/styles';

type Props = {
	route: any;
	navigation: any;
}

const ArticleDetailsScreen = ({ route, navigation }: Props) => {
	const { title, imageUrl, content, subTitle } = route.params.article || {};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: title,
		})
	}, [])

	return (
		<ScrollView style={styles.container}>
			<Image source={{ uri: imageUrl }} style={styles.image} />
			<Text style={styles.subTitle}>{subTitle}</Text>
			<Text style={styles.content}>{content}</Text>
		</ScrollView >
	)
}

export default ArticleDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: GlobalStyles.colors.mealsBackColor
	},
	image: {
		width: "100%",
		height: 280,
	},
	subTitle: {
		fontSize: 18,
		textAlign: "center",
		fontWeight: "500",
		margin: 20,
		color: GlobalStyles.colors.btnColor
	},
	content: {
		textAlign: "right",
		fontSize: 16,
		margin: 15
	}
})
