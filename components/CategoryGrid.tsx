import { View, Text, Pressable, StyleSheet, Platform } from 'react-native'
import React from 'react';

const CategoryGrid = ({ color, title, onPress }: any) => {
	console.log('CategoryGrid render')
    return (
        <View style={styles.gridItem}>
            <Pressable
                android_ripple={{
                    color: "#ccc"
                }}
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : null]}
                onPress={onPress}
            >
                <View style={[styles.innerContainer, , { backgroundColor: color }]}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </Pressable>
        </View >
    )
}

export default CategoryGrid;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 40,
        borderRadius: 6,
        elevation: 9,
        height: 80,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        backgroundColor: "#FAD9E6",
        overflow: Platform.OS === 'android' ? "hidden" : 'visible'
    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.4,
    },
    innerContainer: {
        flex: 1,
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
    },
    text: {
        color: "#FFABE1",
        fontSize: 18,
        fontWeight: "bold"
    }

})
