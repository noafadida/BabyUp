import React from 'react';
import { View, Text } from 'react-native'
import { GlobalStyles } from '../consts/styles';

const MealDetails = ({ duration, complexity, affordability, style }: any) => {
    return (
        <View style={[GlobalStyles.detailsMeal, style]}>
            <Text style={[GlobalStyles.detailItem]}>{duration} דקות</Text>
            <Text style={[GlobalStyles.detailItem]}>{complexity.toUpperCase()}</Text>
            <Text style={[GlobalStyles.detailItem]}>{affordability.toUpperCase()}</Text>
        </View>

    )
}
export default MealDetails;