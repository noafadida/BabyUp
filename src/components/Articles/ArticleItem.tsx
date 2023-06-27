import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native'
import { GlobalStyles } from '../../consts/styles';
import { ROUTES_NAMES } from '../../consts/Routes';
import { useNavigation } from '@react-navigation/native';
import { EMPTY_STRING } from '../../consts/GeneralConsts';
import { getDownloadURL, ref, storage } from '../../firebase';

type Props = {
	article: any
}

const ArticleItem = ({ article }: Props) => {
	const navigation = useNavigation()
	const [imageBlob, setImageBlob] = useState(EMPTY_STRING)
	const { ArticleDetailsScreenName } = ROUTES_NAMES;
	const { id, imageUrl, title, content, subTitle } = article || {};

	const selectArticleItemHandler = () => {
		navigation.navigate(ArticleDetailsScreenName as never, { article: { id, imageUrl: imageUrl || imageBlob, title, content, subTitle } } as never)
	};

	useEffect(() => {
		if (id && id !== 'a1' && id !== 'a2' && id !== 'a3') {
			const fetchArticleImage = async () => {
				try {
					const url = await getDownloadURL(ref(storage, id))
					setImageBlob(url)
				} catch (e) {
					console.log(e)
					return EMPTY_STRING;
				}
			}
			fetchArticleImage()
		}
	}, [id])

	return (
		<View style={styles.item}>
			<Pressable
				android_ripple={{ color: "#ccc" }}
				style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
				onPress={selectArticleItemHandler}
			>
				<View style={styles.innerContainer}>
					<View>
						{(imageUrl || imageBlob) && <Image source={{ uri: imageUrl || imageBlob }} style={styles.image} />}
						<Text style={styles.title}>{title}</Text>
					</View>
				</View>
			</Pressable>
		</View >
	)
}
export default ArticleItem

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