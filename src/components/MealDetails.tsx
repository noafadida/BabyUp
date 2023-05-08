import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../consts/styles';
import { Ionicons } from '@expo/vector-icons';

const MealDetails = ({ duration, complexity, style }: any) => {
    return (
        <View style={[styles.detailsMeal, style]}>
            <View style={styles.time}>
                <Text style={{  color: "#ccc", margin: 5 }}>{duration} דקות </Text>
                <Ionicons name='time-outline' size={22} color={GlobalStyles.colors.btnColor} />
            </View>
            <Text style={{ color: "#ccc", margin: 5 }}>{complexity} </Text>
        </View>
    )
}
export default MealDetails;

const styles = StyleSheet.create({
    detailsMeal: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 3,
        marginTop:2,
        justifyContent: "center",
        gap: 25,
    },
    time: {
        flexDirection: "row",
    }
})