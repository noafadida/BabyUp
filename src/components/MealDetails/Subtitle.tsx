import { View, Text, StyleSheet } from 'react-native'

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
        color: "#ceb5a7",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    subTitleContainer: {
        borderBottomColor: "#f3e7e4",
        borderBottomWidth: 2,
        padding: 6,
        marginHorizontal: 12,
        marginVertical: 6,
    }
})