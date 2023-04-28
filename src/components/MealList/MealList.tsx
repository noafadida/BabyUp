import React, { FC } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import MealItem from './MealItem';
import { GlobalStyles } from '../../consts/styles';


const MealList: FC<{ navigation: any, items: any, route?: any }> = ({ navigation, items, route }) => {

    const renderMealItem = (itemData: any) => {
        const item = itemData.item

        const mealItemProps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            duration: item.duration,
            complexity: item.complexity,
            affordability: item.affordability
        }
        return <MealItem navigation={navigation} {...mealItemProps} />

    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item): any => item.id}
                renderItem={renderMealItem}
            />
        </View>
    )
}

export default MealList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: GlobalStyles.colors.mealsBackColor
    },
})