import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../consts/styles';

const CallUsPage = ({ duration, complexity, affordability, style, textStyle }: any) => {
    return (
        <View style={styles.container}>
            <Text>CallUsPage</Text>
        </View>
    )
}

export default CallUsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.appBodyBackColor, 
        justifyContent:"center"
    }
})