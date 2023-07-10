import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { store } from "./src/store";
import Fonts from './assets/fonts/fonts';
import StackNavigator from "./src/navigation/StackNavigator";

const App = () => {
	const [loaded] = useFonts({ DancingScript: Fonts.DancingScript });

	if (!loaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<Provider store={store}>
				<StackNavigator />
			</Provider>
		</NavigationContainer>
	);
};

export default App;
