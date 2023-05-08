export type Allergy = { id: string; name: string };
import { ViewStyle } from "react-native";

export type Gender = 'MALE' | 'FEMALE';

export interface InputContainerStyle extends ViewStyle {
	marginVertical?: number;
}
