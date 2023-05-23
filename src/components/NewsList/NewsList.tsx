import React, { FC } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import NewsItem from './NewsItem';
import { GlobalStyles } from '../../consts/styles';


const NewsList: FC<{ navigation: any, items: any, route?: any }> = ({ navigation, items, route }) => {

    const renderArticlelItem = (itemData: any) => {
        const item = itemData.item

        const itemProps = {
            id: item.id,
            imageUrl: item.imageUrl,
            title: item.title,
            subTitle: item.subTitle,
            content: item.content

        }
        return <NewsItem navigation={navigation} {...itemProps} />

    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item): any => item.id}
                renderItem={renderArticlelItem}
            />
        </View>
    )
}
export default NewsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: GlobalStyles.colors.mealsBackColor
    },
})