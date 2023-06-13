import React, { FC, useLayoutEffect } from 'react';
import { StyleSheet, Text, Image, ScrollView, Button, FlatList, View } from 'react-native';
import { TIPS, } from '../../data';
import { GlobalStyles } from '../consts/styles';
import SuperFoodItem from '../components/TipsList/SuperFoodItem';


const TipsDetailsScreen: FC<{ route?: any, navigation?: any }> = ({ route, navigation }) => {

    const itemId = route.params.id
    const selectedTip: any = TIPS.find((tip) => tip.id === itemId)

    const renderItem = (itemData: any) => {
        const item = itemData.item
        const itemProps = {
            id: item.id,
            title: item.title,
            itemData: item.itemData
        }
        return <SuperFoodItem navigation={navigation} {...itemProps} />

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedTip.title,
        })
    }, [selectedTip, navigation])

    return (
        <View style={styles.container}>
            <Image source={{ uri: selectedTip.imageUrl }} style={styles.image} />
            <Text style={styles.subTitle}>{selectedTip.subTitle}</Text>
            {itemId === 't1' && (
                <View style={styles.listContainer}>
                    <Text style={styles.text}>בחרו את סוג המזון הרצוי </Text>
                    <FlatList
                        data={selectedTip.content}
                        keyExtractor={(item): any => item.id}
                        renderItem={renderItem}
                        numColumns={3}
                        horizontal={false}
                    />
                </View>
            )}
        </View >
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
        color: GlobalStyles.colors.headerBackColor
    },
    content: {
        textAlign: "right",
        fontSize: 16,
        margin: 15
    },
    text: {
        fontSize: 16,
        color: "#D3DEDC",
        textAlign: "center",
        paddingBottom:5
    },
    listContainer: {
        alignItems: 'center',
    }
})
