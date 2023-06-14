import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../consts/styles';

const CallUsScreen = ({ duration, complexity, affordability, style, textStyle }: any) => {
    return (
        <View style={styles.container}>
            <Text>CallUsScreen</Text>
        </View>
    )
}

export default CallUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.appBodyBackColor, 
        justifyContent:"center"
    }
})