import { View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../consts/styles';

type Props = {
	route: any;
}

const SuperFoodItemScreen = ({ route }: Props) => {
	const foodId = route.params.id

	return (
		<View style={styles.container}></View>
	)
}

export default SuperFoodItemScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: GlobalStyles.colors.mealsBackColor,
	}
})
