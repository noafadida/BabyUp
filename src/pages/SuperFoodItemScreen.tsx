import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Alert } from 'react-native';
import { GlobalStyles } from '../consts/styles';




const SuperFoodItemScreen: FC<{ route?: any, navigation?: any }> = ({ route, navigation }) => {
    const foodId = route.params.id
console.log('SCREEN')
    // const selectedFood: any = Tips.find((meal) => meal.id === mealId)

    return (
        // <ScrollView style={styles.container}>
        // </ScrollView >
        <View style={styles.container}></View>
    )
}

export default SuperFoodItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: GlobalStyles.colors.mealsBackColor,
    }
})
