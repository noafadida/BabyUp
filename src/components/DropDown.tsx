import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { GlobalStyles } from '../consts/styles';


function DropDown(items: any) {
    const [selectedValue, setSelectedValue] = useState("בחר/י");

    const onValueChange = (itemValue: any) => {
        // console.log("onValue" + itemValue)
        setSelectedValue(itemValue);
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
                items={items.items}
                onValueChange={onValueChange}
                value={selectedValue}
            />
        </View>
    );
}

export default DropDown;

const styles = StyleSheet.create({
    picker: {
        // backgroundColor: "red",
        // color: "red",

    }
});


