import { createSlice } from '@reduxjs/toolkit';
import { EMPTY_STRING } from '../consts/GeneralConsts';

const INITIAL_STATE = {
	newMealTimeDropdown: EMPTY_STRING,
	newMealLevelDropdown: EMPTY_STRING,
	allMeals: {},
	userInfo: {},
	isBioChanged: false,
	imageBlob: '',
	isBabyInfoHasChanged: false
}

const generalSlice = createSlice({
	name: 'general',
	initialState: INITIAL_STATE,
	reducers: {
		setNewMealTimeDropdown: (state: any, action: any) => {
			state.newMealTimeDropdown = action.payload.newMealTimeDropdown
		},
		setNewMealLevelDropdown: (state: any, action: any) => {
			state.newMealLevelDropdown = action.payload.newMealLevelDropdown
		},
		setAllMeals: (state: any, action: any) => {
			state.allMeals = action.payload.allMeals
		},
		setUserInfo: (state: any, action: any) => {
			state.userInfo = action.payload.userInfo
		},
		setIsBioChanged: (state: any, action: any) => {
			state.isBioChanged = action.payload.isBioChanged
		},
		setImageBlob: (state: any, action: any) => {
			state.imageBlob = action.payload.imageBlob
		},
		setIsBabyInfoHasChanged: (state: any, action: any) => {
			state.isBabyInfoHasChanged = action.payload.isBabyInfoHasChanged
		},
	}
});


export const setNewMealTimeDropdown: any = generalSlice.actions.setNewMealTimeDropdown;
export const setNewMealLevelDropdown: any = generalSlice.actions.setNewMealLevelDropdown;
export const setAllMeals: any = generalSlice.actions.setAllMeals;
export const setUserInfo: any = generalSlice.actions.setUserInfo;
export const setIsBioChanged: any = generalSlice.actions.setIsBioChanged;
export const setImageBlob: any = generalSlice.actions.setImageBlob;
export const setIsBabyInfoHasChanged: any = generalSlice.actions.setIsBabyInfoHasChanged;
export default generalSlice.reducer;