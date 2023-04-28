import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../consts/styles';

function List({ data }: any) {
    return data.map((dataPoint: any) => (
        <View key={dataPoint} style={styles.listItem}>
            <Text style={styles.itemContentText}>{dataPoint}</Text>
        </View>
    ))
}

export default List;

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 4,
        paddingVertical: 6,
        marginVertical: 2,
        marginHorizontal: 12,
        backgroundColor: "#f3e7e4",
    },
    itemContentText: {
        color: GlobalStyles.colors.mealTextContent,
        textAlign: "center",
    }
})