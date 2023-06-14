import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native'
import { GlobalStyles } from '../../consts/styles';
import { ROUTES_NAMES } from '../../consts/Routes';
import { useNavigation } from '@react-navigation/native';
import { EMPTY_STRING } from '../../consts/GeneralConsts';
import { getDownloadURL, ref, storage } from '../../firebase';

type Props = {
	item: any;
}

const TipsItem = ({ item }: Props) => {
	const navigation = useNavigation()
	const [imageBlob, setImageBlob] = useState(EMPTY_STRING)
	const { TipsDetailsScreenName } = ROUTES_NAMES;
	const { id, imageUrl, title, content, subTitle } = item;

	useEffect(() => {
		const fetchMealImage = async () => {
			try {
				const url = await getDownloadURL(ref(storage, id))
				setImageBlob(url)
			} catch (e) {
				return EMPTY_STRING;
			}
		}
		fetchMealImage()
	}, [])

	const selectArticleItemHandler = () => {
		const updatedItem = {
			imageUrl: imageUrl || imageBlob,
			id,
			title,
			content,
			subTitle
		}
		navigation.navigate(TipsDetailsScreenName as never, { updatedItem } as never)
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
						{(imageUrl || imageBlob) && <Image source={{ uri: imageUrl || imageBlob }} style={styles.image} />}
						<Text style={styles.title}>{title}</Text>
					</View>
				</View>
			</Pressable>
		</View >
	)
}
export default TipsItem

const styles = StyleSheet.create({
	item: {
		marginVertical: 12,
		marginHorizontal: 15,
		backgroundColor: 'white',
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