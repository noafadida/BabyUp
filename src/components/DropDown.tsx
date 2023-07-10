import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../consts/styles';
import { useDispatch } from 'react-redux';
import { setNewMealLevelDropdown, setNewMealTimeDropdown } from '../store/general';
import RNPickerSelect from 'react-native-picker-select';

type Props = {
	items: Item[];
	name: 'Time' | 'Level'
}

type Item = {
	label: string;
	value: string | number;
}

function DropDown({ items, name }: Props) {
	const [selectedValue, setSelectedValue] = useState("בחר/י");

	const dispatch = useDispatch()

	const onValueChange = (itemValue: any) => {
		setSelectedValue(itemValue);
		dispatch(name === 'Level' ? setNewMealLevelDropdown({ newMealLevelDropdown: itemValue }) : setNewMealTimeDropdown({ newMealTimeDropdown: itemValue }))
	}

	const myStyles = {
		inputIOS: {
			fontSize: 16,
			paddingVertical: 8,
			paddingHorizontal: 14,
			borderWidth: 2,
			borderColor: '#EBEBEB',
			borderRadius: 4,
			color: 'grey',
			paddingRight: 20,
			backgroundColor: GlobalStyles.colors.appBodyBackColor,
			marginLeft: 5,
			marginRight: 5,
		},
		inputAndroid: {
			fontSize: 16,
			paddingHorizontal: 12,
			paddingVertical: 8,
			borderColor: '#EBEBEB',
			borderWidth: 0.5,
			borderRadius: 8,
			color: 'grey',
			paddingRight: 10,
			backgroundColor: 'white',
			marginLeft: 5,
			marginRight: 5,
		},
	};

	return (
		<View>
			<RNPickerSelect style={myStyles}
				items={items}
				onValueChange={onValueChange}
				value={selectedValue}
			/>
		</View>
	);
}

export default DropDown;

const styles = StyleSheet.create({
	picker: {
	}
});


