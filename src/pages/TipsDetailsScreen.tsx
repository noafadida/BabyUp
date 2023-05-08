import React, { FC, useLayoutEffect } from 'react';
import { StyleSheet, Text, Image, ScrollView } from 'react-native';
import { TIPS, } from '../../data';
import { GlobalStyles } from '../consts/styles';

const TipsDetailsScreen: FC<{ route?: any, navigation?: any }> = ({ route, navigation }) => {

    const itemId = route.params.id
    const selectedTip: any = TIPS.find((tip) => tip.id === itemId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedTip.title,
        })
    }, [selectedTip, navigation])

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: selectedTip.imageUrl }} style={styles.image} />
            <Text style={styles.subTitle}>{selectedTip.subTitle}</Text>
            <Text style={styles.content}>{selectedTip.content}</Text>
        </ScrollView >
    )
}

export default TipsDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: GlobalStyles.colors.mealsBackColor,
    },
    image: {
        width: "100%",
        height: 280,
    },
    subTitle: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "500",
        margin: 20,
        color: GlobalStyles.colors.btnColor
    },
    content: {
        textAlign: "right",
        fontSize: 16,
        margin: 15
    }
})
