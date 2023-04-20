import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native'

const CategoryGrid = ({ color, title, onPress }: any) => {
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
				<View style={[styles.innerContainer, { backgroundColor: color }]}>
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
        marginTop: 50,
        marginHorizontal: 65,
        borderRadius: 6,
        elevation: 9,
        height: 70,
        shadowColor: "#F25287",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        backgroundColor: "#FAD9E6",
        overflow: Platform.OS === 'android' ? "hidden" : 'visible'
    },
    button: {
        flex: 1,
        borderRadius: 6,
    },
    buttonPressed: {
        opacity: 0.4,
    },
    innerContainer: {
        flex: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
    },
    text: {
        color: "#212121",
        fontSize: 18,
        fontWeight: "bold",
    },

})

