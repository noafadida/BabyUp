import { useLayoutEffect } from 'react';
import { StyleSheet, Text, Image, FlatList, View } from 'react-native';
import { GlobalStyles } from '../consts/styles';
import SuperFoodItem from '../components/TipsList/SuperFoodItem';

type Props = {
	navigation: any;
	route: any;
}

const TipsDetailsScreen = ({ navigation, route }: Props) => {
	const { imageUrl, id, title, content, subTitle } = route.params.updatedItem

	const renderItem = (itemData: any) => {
		const item = itemData.item
		return <SuperFoodItem item={item} />

	}

	useLayoutEffect(() => {
		navigation.setOptions({ title })
	}, [])

	return (
		<View style={styles.container}>
			{imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
			<Text style={styles.subTitle}>{subTitle}</Text>
			{id === 't1' ? (
				<View style={styles.listContainer}>
					<Text style={styles.text}>בחרו את סוג המזון הרצוי </Text>
					<FlatList
						data={content}
						keyExtractor={(item): any => item.id}
						renderItem={renderItem}
						numColumns={3}
						horizontal={false}
					/>
				</View>
			) : (
					<Text style={styles.text}>{content}</Text>
			)}
		</View >
	)
}

export default TipsDetailsScreen;

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
	subTitle: {
		fontSize: 18,
		textAlign: "center",
		fontWeight: "500",
		margin: 20,
		color: GlobalStyles.colors.headerBackColor
	},
	content: {
		textAlign: "right",
		fontSize: 16,
		margin: 15
	},
	text: {
		fontSize: 16,
		color: "#D3DEDC",
		textAlign: "center",
		paddingBottom: 5
	},
	listContainer: {
		alignItems: 'center',
	}
})
