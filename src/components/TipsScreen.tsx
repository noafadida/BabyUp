import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native'
import { GlobalStyles } from '../consts/styles';
import { SCREEN_NAMES } from '../consts/Routes'
import { TIPS } from '../../data';
import TipsList from './TipsList/TipsList';

const TipsScreen = ({ navigation }: any) => {
    const displayTip = TIPS.filter((tipItem) => { return tipItem })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.homeHeader}>
                    <Text style={styles.text}>{SCREEN_NAMES.TipsScreenName}</Text>
                    <Image
                        source={require('../../assets/babyupLogoNew.png')}
                        style={styles.image}
                    />
                </View>
            )
        })
    }, [navigation])
    return (
        <TipsList navigation={navigation} items={displayTip} />
    )
}

export default TipsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.appBodyBackColor,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white",
        fontSize: 18,
        textAlignVertical: "center",
        marginBottom: 5,
        letterSpacing: 0.8,
        textAlign: "center",
    },
    image: {
        resizeMode: 'contain',
        height: 45,
        width: 45
    },
    homeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    textContainer: {
        backgroundColor: "white",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
        padding: 20
    },
    contentText: {
        textAlign: "right",
    },
    newsItem: {
        marginVertical: 12,
        marginHorizontal: 15,
        borderRadius: 5,
        backgroundColor: 'pink',
        shadowColor: "#ceb5a7",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        overflow: Platform.OS === 'android' ? "hidden" : 'visible'
    },
})