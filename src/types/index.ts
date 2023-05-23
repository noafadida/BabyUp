export type Allergy = { id: string; name: string };
import { ViewStyle } from "react-native";

export type Gender = "MALE" | "FEMALE";

export interface InputContainerStyle extends ViewStyle {
  marginVertical?: number;
}

export type BabyInfo = {
  babyAge: string;
  babyName: string;
  babyBirthDate: string;
  parentName: string;
  gender: string;
  selectedAllergies: string[];
};
