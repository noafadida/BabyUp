import React, { FC } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import TipsItem from './TipsItem';
import { GlobalStyles } from '../../consts/styles';


const TipsList: FC<{ navigation: any, items: any, route?: any }> = ({ navigation, items, route }) => {

    const renderTipItem = (itemData: any) => {
        const item = itemData.item
        console.log(item.imageUrl)

        const itemProps = {
            id: item.id,
            imageUrl: item.imageUrl,
            title: item.title,
            subTitle: item.subTitle,
            content: item.content

        }
        return <TipsItem navigation={navigation} {...itemProps} />

    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item): any => item.id}
                renderItem={renderTipItem}
            />
        </View>
    )
}
export default TipsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: GlobalStyles.colors.mealsBackColor
    },
})