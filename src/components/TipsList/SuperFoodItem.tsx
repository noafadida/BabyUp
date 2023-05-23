import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native'
import React, { FC, useState } from 'react';
import { GlobalStyles } from '../../consts/styles';
import CustomModal from '../CustomModal';

const SuperFoodItem: FC<{ navigation: any }> = ({ id, title, itemData, navigation }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const selectedFoodItemHandler = () => {
    // navigation.navigate("SuperFoodItemScreen", {
    //     id: id
    // })

    // };
    const ItemModal = () => (
        <View style={styles.modal}>
            {/* <Text style={styles.modalText}>{id}</Text> */}
            <Text style={styles.modalTitleText}>{title}</Text>
            <Text style={styles.modalDataText}>{itemData} </Text>
        </View>
    )
    return (
        <>
            <View style={styles.item}>
                <Pressable
                    android_ripple={{ color: "#ccc" }}
                    style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                    onPress={() => setIsModalOpen(true)}
                >
                    <View style={styles.innerContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </Pressable>
            </View >
            {isModalOpen && (
                <CustomModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} transparent animationType='fade'>
                    <ItemModal />
                </CustomModal>
            )}
        </>
    )
}
export default SuperFoodItem

const styles = StyleSheet.create({
    item: {
        marginVertical: 12,
        marginHorizontal: 15,
        shadowOpacity: 0.2,
        shadowColor: "white",
        shadowOffset: { width: 0, height: 2, },
        overflow: Platform.OS === 'android' ? "hidden" : 'visible',
        borderRadius: 20,

    },
    innerContainer: {
        overflow: 'hidden',
        borderRadius: 8,
        width: 100
    },
    image: {
        width: "100%",
        height: 200
    },
    title: {
        fontSize: 16,
        // fontWeight: "bold",
        letterSpacing: 0.3,
        textAlign: "center",
        padding: 8,
        backgroundColor: "#D3DEDC",
        borderRadius: 20,
        color: "white",
    },
    buttonPressed: {
        opacity: 0.9,
    },
    modal: {
        backgroundColor: '#F7C8E0',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%"
    },
    modalTitleText: {
        textAlign: 'center',
        fontSize: 18,
        color: "white",
        fontWeight: "500"
    },
    modalDataText: {
        textAlign: 'center',
        color: "white",
        marginHorizontal: 7,
        marginTop: 10,
        fontSize: 18,
        // color: "#4D4D4D"
    }
})