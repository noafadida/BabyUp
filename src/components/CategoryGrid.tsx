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
        marginVertical: 5,
        shadowColor: "#ff9ebb",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 0,
        overflow: Platform.OS === 'android' ? "hidden" : 'visible'
    },
    buttonCategory: {
        borderRadius: 0,
        flex:1
    },
    buttonCategoryPressed: {
        opacity: 0.6,
    },
    innerContainer: {
        flex: 1,
        paddingVertical: 5,
        width:180,
        flexDirection: 'row',
        justifyContent: "center",
        borderRadius: 0,
        backgroundColor: GlobalStyles.colors.btnLightColor,
        gap: 3
    },
    text: {
        fontSize: 20,
        color: GlobalStyles.colors.btnLightTextColor,
        
    },
    icon: {
        color: GlobalStyles.colors.btnLightTextColor,
    }

})

