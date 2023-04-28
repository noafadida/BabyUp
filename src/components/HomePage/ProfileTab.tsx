import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { GlobalStyles } from '../../consts/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ProfileTab = ({ route, navigation }: any) => {
	const babyName = "עומר"
	const babyNameEng = "Omer"
	const gender = "נקבה"
	const age = "10 חודשים"


	return (

		<View style={styles.screen}>
			<Image source={require('../../../assets/babyupLogoNew.png')} style={styles.image} />
			<Text style={GlobalStyles.titleTextStyle}> {babyNameEng} Mommy's</Text>
			<View style={styles.innerComponent}>
				<TouchableOpacity style={GlobalStyles.buttonLightStyle}>
					<Text style={GlobalStyles.buttonLightTextStyle}>עריכת פרופיל</Text>
				</TouchableOpacity>
				<TouchableOpacity style={GlobalStyles.buttonLightStyle}>
					<Text style={GlobalStyles.buttonLightTextStyle}>עריכת פרופיל</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.deatils}>
				<View style={styles.innerDetails}>
					<Text style={styles.titleDetails}>שם</Text>
					<Text style={styles.textDetails}>{babyName}</Text>
				</View>
				<View style={styles.innerDetails}>
					<Text style={styles.titleDetails}>גיל</Text>
					<Text style={styles.textDetails}>{age}</Text>
				</View>
				<View style={styles.innerDetails}>
					<Text style={styles.titleDetails}>מין</Text>
					<Text style={styles.textDetails}>{gender}</Text>
				</View>


			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: 35,
		alignItems: "center",
		backgroundColor: GlobalStyles.colors.appBodyBackColor,
	},
	image: {
		width: 250,
		height: 250,
		resizeMode: "contain"
	},
	innerComponent: {
		flexDirection: 'row',
		gap: 6,
		marginBottom: 15
	},
	deatils: {
		backgroundColor: "#FFD6EC",
		flexDirection: "column",
		justifyContent: 'center',
		alignItems: "flex-end",
		width: "74%",
		flex: 0.3,
		gap: 10,
		borderRadius: 8
	},
	titleDetails: {
		fontSize: 18,
		color: "#FF8DC7"
	},
	textDetails: {
		fontSize: 18,
		color: "white"
	},
	innerDetails: {
		flexDirection: "row-reverse",
		marginHorizontal: 20,
		gap: 10
	}
});