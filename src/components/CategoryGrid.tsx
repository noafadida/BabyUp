import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native'
import { GlobalStyles } from '../consts/styles';
import { Ionicons } from '@expo/vector-icons'

const CategoryGrid = ({ title, onPress }: any) => {
    return (
        <View style={styles.gridItem}>
            <Pressable
                android_ripple={{
                    color: "#ccc"
                }}
                style={({ pressed }) => [
                    styles.buttonCategory,
                    pressed ? styles.buttonCategoryPressed : null]}
                onPress={onPress}
            >
                <View style={[styles.innerContainer]}>
                    <Text style={styles.text}>{title}</Text>
                    <Ionicons style={styles.icon} name="arrow-forward-outline" size={22} />
                </View>
            </Pressable>
        </View >
    )
}

export default CategoryGrid;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        alignItems: "center",   
        justifyContent:"center",
        marginVertical: 15,
        marginHorizontal:20,
        shadowColor: "#ff9ebb",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? "hidden" : 'visible'
    },
    buttonCategory: {
        flex: 1,
        borderRadius: 8,
    },
    buttonCategoryPressed: {
        opacity: 0.6,
    },
    innerContainer: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 20,
        width:200,
        flexDirection: 'row',
        justifyContent: "center",
        borderRadius: 8,
        backgroundColor: GlobalStyles.colors.btnLightColor,
        gap: 5
    },
    text: {
        fontSize: 20,
        color: GlobalStyles.colors.btnLightTextColor,
        
    },
    icon: {
        color: GlobalStyles.colors.btnLightTextColor,
    }

})

