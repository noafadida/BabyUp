import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../consts/styles';

const QuestionsScreen = ({ duration, complexity, affordability, style, textStyle }: any) => {
    return (
        <View style={styles.container}>
            <Text>QuestionsScreen</Text>
        </View>
    )
}

export default QuestionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.appBodyBackColor,
        justifyContent: "center"
    }
})