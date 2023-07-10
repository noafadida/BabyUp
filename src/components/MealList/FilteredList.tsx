import { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { GlobalStyles } from '../../consts/styles';
import CustomModal from '../CustomModal';
import MealList from './MealList';

const Filter = ({ label, value, onValueChange }: any) => {
	return (
		<View style={{ flexDirection: 'row', padding: 10, justifyContent: "flex-end" }}>
			<Text style={{ alignSelf: "center", textAlign: "right", color: "white", fontSize: 16 }}>{label}</Text>
			<Switch value={value} onValueChange={onValueChange} thumbColor={GlobalStyles.colors.btnColor} ios_backgroundColor="white" trackColor={{ true: "#F190B7" }} style={{ marginHorizontal: 10, justifyContent: "center", }} />
		</View>
	);
};

type Props = {
	items: any;
	userAllergies: boolean[]
}

const FilteredList = ({ items, userAllergies }: Props) => {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)
	const [filteredData, setFilteredData] = useState<any>(items)
	const [filterOptions, setFilterOptions] = useState(userAllergies || [false, false, false, false]);
	const [isGlutenFreeFilter, isNutsFreeFilter, isMilkFreeFilter, isEggsFreeFilter] = filterOptions;

	useEffect(() => {
		const updatedFilteredData = (items).filter((item: any) => {
			if (isGlutenFreeFilter && !item?.allergies?.[0]) {
				return false
			}
			if (isNutsFreeFilter && !item?.allergies?.[1]) {
				return false
			}
			if (isMilkFreeFilter && !item?.allergies?.[2]) {
				return false
			}
			if (isEggsFreeFilter && !item?.allergies?.[3]) {
				return false
			}
			return true;
		});
		setFilteredData(updatedFilteredData)
	}, [filterOptions])


	const handleFilterChanges = (id: number, value: boolean) => {
		const updatedState = [...filterOptions]
		updatedState[id] = value
		setFilterOptions(updatedState)
	}

	const handleFilterBtn = () => {
		return (
			<View style={styles.filterContainer}>
				<Filter
					label="ללא גלוטן"
					value={isGlutenFreeFilter}
					onValueChange={(value: boolean) => handleFilterChanges(0, value)}
				/>
				<Filter
					label="ללא אגוזים"
					value={isNutsFreeFilter}
					onValueChange={(value: boolean) => handleFilterChanges(1, value)}
				/>
				<Filter
					label="ללא חלב"
					value={isMilkFreeFilter}
					onValueChange={(value: boolean) => handleFilterChanges(2, value)}
				/>
				<Filter
					label="ללא ביצים"
					value={isEggsFreeFilter}
					onValueChange={(value: boolean) => handleFilterChanges(3, value)}
				/>
				<Pressable onPress={() => setIsFilterModalOpen(false)} style={{ alignItems: "center", marginBottom: 5 }}>
					<Text style={[GlobalStyles.buttonLightTextStyle,]}>שמור </Text>
				</Pressable>
			</View>
		)
	}
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => setIsFilterModalOpen(true)}
				style={[GlobalStyles.buttonLightPinkStyle, { alignSelf: "flex-end", marginTop: 0, marginBottom: 3, paddingVertical: 3, paddingHorizontal: 12, marginRight: 10, }]}
			>
				<Text style={{ fontSize: 16, color: "white" }}>סינון </Text>
			</TouchableOpacity>
			{isFilterModalOpen && (
				<CustomModal onClose={() => setIsFilterModalOpen(false)} visible={isFilterModalOpen} animationType='fade' transparent>
					{handleFilterBtn()}
				</CustomModal>
			)}
			<MealList items={filteredData} />
		</View>
	);
};

export default FilteredList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: GlobalStyles.colors.mealsBackColor
	},
	filterContainer: {
		width: '70%',
		backgroundColor: "#F9B5D0",
		padding: 5,
		borderRadius: 5,
	},

})
