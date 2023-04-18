import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native'
import React from 'react';

const MealItem = ({ title, imageUrl, duration, complexity, affordability }: any) => {
    return <View style={styles.mealItem}>
        <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        >
            <View style={styles.innerContainer}>
                <View>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailItem}>{duration}m</Text>
                    <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
                    <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
                </View>

            </View>
        </Pressable>
    </View >
}
export default MealItem

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 6,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        overflow: Platform.OS === 'android' ? "hidden" : 'visible'

    },
    innerContainer: {
        borderRadius: 6,
        overflow: 'hidden'
    },
    image: {
        width: "100%",
        height: 200
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        justifyContent: "center"
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
    buttonPressed: {
        opacity: 0.5,
    },
})