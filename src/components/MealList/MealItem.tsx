import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native'
import { useEffect, useState } from 'react';
import { GlobalStyles } from '../../consts/styles';
import { EMPTY_STRING } from '../../consts/GeneralConsts';
import { getDownloadURL, ref, storage } from '../../firebase'
import { ROUTES_NAMES } from '../../consts/Routes';
import { useNavigation } from '@react-navigation/native';
import MealDetails from '../MealDetails';

type Props = {
	item: any;
}

const MealItem = ({ item }: Props) => {
	const navigation = useNavigation()
	const [imageBlob, setImageBlob] = useState<string>(EMPTY_STRING);
	const { id, title, duration, complexity, imageUrl } = item || {}

	const selectMealItemHandler = () => {
		navigation.navigate(ROUTES_NAMES.MealDetailScreenName as never, {
			mealId: id,
			item: { ...item, imageBlob }
		} as never)
	};

	useEffect(() => {
		const fetchMealImage = async () => {
			try {
				if (id) {
					if (imageUrl) {
						setImageBlob(imageUrl)
						return;
					}
					const url = await getDownloadURL(ref(storage, id))
					setImageBlob(url)
				}
			} catch (e) {
				return EMPTY_STRING;
			}
		}
		fetchMealImage()
	}, [id])

	return (
		<View style={styles.mealItem}>
			<Pressable
				android_ripple={{ color: "#ccc" }}
				style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
				onPress={selectMealItemHandler}
			>
				<View style={styles.innerContainer}>
					<View>
						<Image source={imageBlob ? { uri: imageBlob } : require('../../../assets/no-image.png')} style={styles.image} />
						<Text style={styles.title}>{title}</Text>
					</View>
					<MealDetails
						duration={duration}
						complexity={complexity}
					/>
				</View>
			</Pressable>
		</View >
	)
}
export default MealItem

const styles = StyleSheet.create({
	mealItem: {
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
		marginTop: 7,
		color: GlobalStyles.colors.mealNameTitle
	},
	buttonPressed: {
		opacity: 0.9,
	},

})