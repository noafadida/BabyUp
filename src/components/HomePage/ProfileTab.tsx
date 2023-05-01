import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { GlobalStyles } from '../../consts/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EMPTY_STRING } from '../../consts/GeneralConsts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutHandler } from '../../utils';

export const ProfileTab = ({ route, navigation }: any) => {
	const gender = "נקבה"
	const age = "10 חודשים"

	const [displayName, setDisplayName] = useState(EMPTY_STRING)

	useEffect(() => {
		const fetchUserInfo = async () => {
			const user = await AsyncStorage.getItem('user')
			const userInfo = JSON.parse(user || '')
			userInfo?.[0].displayName && setDisplayName(userInfo[0].displayName)
			console.log('USER', userInfo?.[0])
		}
		fetchUserInfo()
	}, [])

	return (

		<View style={styles.screen}>
			<Image source={require('../../../assets/babyupLogoNew.png')} style={styles.image} />
			<Text style={GlobalStyles.titleTextStyle}> {displayName} Mommy's</Text>
			<View style={styles.innerComponent}>
				<TouchableOpacity onPress={() => logoutHandler(navigation)} style={GlobalStyles.buttonLightStyle}>
					<Text style={GlobalStyles.buttonLightTextStyle}>התנתקות</Text>
				</TouchableOpacity>
				<TouchableOpacity style={GlobalStyles.buttonLightStyle}>
					<Text style={GlobalStyles.buttonLightTextStyle}>עריכת פרופיל</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.deatils}>
				<View style={styles.innerDetails}>
					<Text style={styles.titleDetails}>שם</Text>
					<Text style={styles.textDetails}>{displayName}</Text>
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