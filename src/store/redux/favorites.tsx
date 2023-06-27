import { createSlice } from '@reduxjs/toolkit';

const INITAL_STATE = {
	meals: {},
	mealsValues: [],
	mealsIds: []
}

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: INITAL_STATE,
	reducers: {
		setFavoriteMeals: (state: any, action: any) => {
			const { meals } = action.payload
			state.meals = meals
			state.mealsValues = Object.values(meals)
			state.mealsIds = Object.keys(meals)
		}
	}
});


export const setFavoriteMeals: any = favoritesSlice.actions.setFavoriteMeals;
export default favoritesSlice.reducer;