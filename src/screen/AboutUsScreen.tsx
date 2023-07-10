import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { db, doc, getDoc } from '../firebase';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { useDispatch, useSelector } from 'react-redux';
import { Collections } from '../consts/firebaseConsts';
import { setIsBioChanged } from '../store/general';

const AboutUsScreen = () => {
	const [bio, setBio] = useState<{ top: string, bottom: string }>({ top: EMPTY_STRING, bottom: EMPTY_STRING })
	const dispatch = useDispatch()
	const isBioChanged = useSelector((state: any) => state.general.isBioChanged)

	useEffect(() => {
		const fetchBioData = async () => {
			const docRef = await getDoc(doc(db, Collections.bio, Collections.description));
			const docData: any = docRef.data()
			setBio(docData)
			dispatch(setIsBioChanged({ isBioChanged: false }))

		}
		fetchBioData()
	}, [isBioChanged])

	return (
		<View style={styles.container}>
			<ImageBackground source={require('../../assets/pinkBack.jpeg')} resizeMode="cover" style={styles.image}>
			<Text style={styles.text}>{bio?.top}</Text>
			<View style={styles.bottomContainer}>
				<Text style={styles.textDown}>{bio?.bottom}</Text>
			</View>
		</ImageBackground>
		</View >
	)
}

export default AboutUsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	text: {
		textAlign: "center",
		marginBottom: 10,
		fontSize: 16,
		color: "white",
		padding: 5,
	},
	textDown: {
		textAlign: "center",
		fontSize: 16,
		color: "white",
		fontWeight:"bold"

	},
	bottomContainer: {
		marginTop: 20,
		padding: 8,
		borderRadius: 10,
	},
	image: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 40
	},
})