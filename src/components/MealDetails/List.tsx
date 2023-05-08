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
        paddingVertical: 2,
        marginVertical: 4,
        marginHorizontal: 14,
    },
    itemContentText: {
        // color: "#7F8487",
        textAlign: "right",
        fontSize:16
    }
})