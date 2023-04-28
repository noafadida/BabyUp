import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../consts/styles';

const AboutUsPage = ({ duration, complexity, affordability, style, textStyle,}: any) => {

    return (
        <View style={styles.container}>
            <Text>AboutUsPage</Text>
        </View>
    )
}

export default AboutUsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.appBodyBackColor,
        justifyContent: "center"
    }
})