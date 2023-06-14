import { useState } from 'react';
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
	navigation: any;
	items: any;
}

const FilteredList = ({ navigation, items }: Props) => {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)
	const [filterOptions, setFilterOptions] = useState({
		isGlutenFree: false,
		isNutsFree: false,
		isMilkFree: false,
		isEggsFree: false,
	});

	const filteredData = (items).filter((item: any) => {
		const { isGlutenFree, isNutsFree, isMilkFree, isEggsFree } = filterOptions;
		return (!isGlutenFree || item?.allergies?.includes('1')) && (!isNutsFree || item?.allergies?.includes('2')) && (!isMilkFree || item?.allergies?.includes('3')) && (!isEggsFree || item?.allergies?.includes('4'));
	});

	const handleFilterBtn = () => {
		return (
			<View style={styles.filterContainer}>
				<Filter
					label="ללא גלוטן"
					value={filterOptions.isGlutenFree}
					onValueChange={(value: any) =>
						setFilterOptions((prevOptions) => ({
							...prevOptions,
							isGlutenFree: value,
						}))
					}
				/>
				<Filter
					label="ללא אגוזים"
					value={filterOptions.isNutsFree}
					onValueChange={(value: any) =>
						setFilterOptions((prevOptions) => ({
							...prevOptions,
							isNutsFree: value,
						}))
					}
				/>
				<Filter
					label="ללא חלב"
					value={filterOptions.isMilkFree}
					onValueChange={(value: any) =>
						setFilterOptions((prevOptions) => ({
							...prevOptions,
							isMilkFree: value,
						}))
					}
				/>
				<Filter
					label="ללא ביצים"
					value={filterOptions.isEggsFree}
					onValueChange={(value: any) =>
						setFilterOptions((prevOptions) => ({
							...prevOptions,
							isEggsFree: value,
						}))
					}
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
