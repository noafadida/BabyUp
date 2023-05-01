import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { store } from './src/store/redux/store';
import { useFonts } from 'expo-font';
import Fonts from './assets/fonts/fonts';
import StackNavigator from "./src/navigation/StackNavigator";

const App: FC = () => {
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
