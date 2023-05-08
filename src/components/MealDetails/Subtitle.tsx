import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../consts/styles';

function Subtitle({ children }: any) {
    return (
        <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}> {children}</Text>
        </View>
    )
}

export default Subtitle;

const styles = StyleSheet.create({
    subTitle: {
        color: GlobalStyles.colors.headerBackColor,
        fontSize: 18,
        letterSpacing:0.7,
        fontWeight: "500",
        textAlign: "center",
    },
    subTitleContainer: {
        borderBottomColor: "pink",
        borderBottomWidth: 2,
        marginHorizontal: 12,
        marginVertical: 6,
    }
})