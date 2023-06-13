import React, { FC, useLayoutEffect } from 'react';
import { StyleSheet, Text, Image, ScrollView } from 'react-native';
import { ARTICLES, } from '../../data';
import { GlobalStyles } from '../consts/styles';

const ArticleDetailsScreen: FC<{ route?: any, navigation?: any }> = ({ route, navigation }) => {

    const itemId = route.params.id
    const selectedArticle: any = ARTICLES.find((article) => article.id === itemId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedArticle.title,
        })
    }, [selectedArticle, navigation])

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: selectedArticle.imageUrl }} style={styles.image} />
            <Text style={styles.subTitle}>{selectedArticle.subTitle}</Text>
            <Text style={styles.content}>{selectedArticle.content}</Text>
        </ScrollView >
    )
}

export default ArticleDetailsScreen;

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
        color:GlobalStyles.colors.btnColor
    },
    content: {
        textAlign: "right",
        fontSize: 16, 
        margin:15
    }
})
