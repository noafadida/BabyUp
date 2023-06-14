import { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import { collection, db, getDocs } from '../firebase'
import { GlobalStyles } from '../consts/styles';
import { SCREEN_NAMES } from '../consts/Routes'
import { TIPS } from '../../data';
import TipsList from './TipsList/TipsList';
import { Collections } from '../consts/firebaseConsts';

const TipsScreen = ({ navigation }: any) => {
	const [tipsData, setTipsData] = useState<any[]>([])

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View style={styles.homeHeader}>
					<Text style={styles.text}>{SCREEN_NAMES.TipsScreenName}</Text>
					<Image
						source={require('../../assets/babyupLogoNew.png')}
						style={styles.image}
					/>
				</View>
			)
		})
	}, [])

	useEffect(() => {
		const fetchTipsHandler = async () => {
			try {
				const collectionRef = collection(db, Collections.tips);
				const querySnapshot = await getDocs(collectionRef);
				const tipsCollection: any[] = []
				querySnapshot.forEach((doc) => {
					tipsCollection.push(doc.data())
				});
				setTipsData([...TIPS, ...tipsCollection])
			} catch (e) {
				console.log(e)
			}
		}
		fetchTipsHandler()
	}, [])

	return (
		<TipsList items={tipsData} />
	)
}

export default TipsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.appBodyBackColor,
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		color: "white",
		fontSize: 18,
		textAlignVertical: "center",
		marginBottom: 5,
		letterSpacing: 0.8,
		textAlign: "center",
	},
	image: {
		resizeMode: 'contain',
		height: 45,
		width: 45
	},
	homeHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "center"
	},
	textContainer: {
		backgroundColor: "white",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		width: "60%",
		padding: 20
	},
	contentText: {
		textAlign: "right",
	},
	newsItem: {
		marginVertical: 12,
		marginHorizontal: 15,
		borderRadius: 5,
		backgroundColor: 'pink',
		overflow: Platform.OS === 'android' ? "hidden" : 'visible'
	},
})