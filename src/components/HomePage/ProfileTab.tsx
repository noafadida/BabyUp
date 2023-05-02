import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { GlobalStyles } from '../../consts/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EMPTY_STRING } from '../../consts/GeneralConsts';
import { logoutHandler } from '../../utils';
import { getDoc, doc, db } from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const INITIAL_BABY_INFO_VALUE = {
	babyAge: EMPTY_STRING,
	babyName: EMPTY_STRING,
	babyBirthDate: EMPTY_STRING,
	parentName: EMPTY_STRING,
	gender: EMPTY_STRING
}
type BabyInfo = {
	babyAge: string;
	babyName: string;
	babyBirthDate: string;
	parentName: string;
	gender: string;
}

export const ProfileTab = ({ route, navigation }: any) => {
	const [babyInfo, setBabyInfo] = useState<BabyInfo>(INITIAL_BABY_INFO_VALUE)

	useEffect(() => {
		const fetchUserInfo = async () => {
			const user = await AsyncStorage.getItem('user')
			const userInfo = JSON.parse(user || '')
			const docRef = await getDoc(doc(db, "users", userInfo));
			const docData: any = docRef.data()
			const { babyName, babyBirthDate, parentName, gender } = docData || {};
			const ageMonths = moment().diff(moment(babyBirthDate), 'months');
			setBabyInfo({
				babyAge: ageMonths.toString(),
				babyBirthDate: babyBirthDate,
				babyName,
				parentName,
				gender: gender === 'MALE' ? 'זכר' : 'נקבה'
			})
		}
		fetchUserInfo()
	}, [])

	return (

		<View style={styles.screen}>
			<Image source={require('../../../assets/babyupLogoNew.png')} style={styles.image} />
			<Text style={GlobalStyles.titleTextStyle}>Parent Name: {babyInfo?.parentName}</Text>
			<View style={styles.innerComponent}>
				<TouchableOpacity onPress={() => logoutHandler(navigation)} style={GlobalStyles.buttonLightStyle}>
					<Text style={GlobalStyles.buttonLightTextStyle}>התנתקות</Text>
				</TouchableOpacity>
				<TouchableOpacity style={GlobalStyles.buttonLightStyle}>
					<Text style={GlobalStyles.buttonLightTextStyle}>עריכת פרופיל</Text>
				</TouchableOpacity>
			</View>
			<View style={[styles.deatils, { backgroundColor: babyInfo?.gender === 'זכר' ? '#c3e1ed' : '#FFD6EC'}]}>
				<View style={styles.innerDetails}>
					<Text style={styles.titleDetails}>שם</Text>
					<Text style={styles.textDetails}>{babyInfo?.babyName}</Text>
				</View>
				<View style={styles.innerDetails}>
					<Text style={styles.titleDetails}>גיל</Text>
					<Text style={styles.textDetails}>{babyInfo?.babyAge} חודשים</Text>
				</View>
				<View style={styles.innerDetails}>
					<Text style={styles.titleDetails}>מין</Text>
					<Text style={styles.textDetails}>{babyInfo.gender}</Text>
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
		backgroundColor: GlobalStyles.colors.appBodyBackColor
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
		flexDirection: "column",
		justifyContent: 'center',
		alignItems: "flex-end",
		width: "74%",
		flex: 0.3,
		gap: 10,
		borderRadius: 8,
		paddingVertical: 20
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