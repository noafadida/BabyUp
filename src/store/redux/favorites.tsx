import { createSlice } from '@reduxjs/toolkit';

const INITAL_STATE = {
	ids: [],
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
		},
		addFavorite: (state: any, action: any) => {
			state.ids.push(action.payload.id)
		},
		removeFavorite: (state: any, action: any) => {
			state.ids.splice(state.ids.indexOf(action.payload.id), 1)
		}
	}
});


export const setFavoriteMeals: any = favoritesSlice.actions.setFavoriteMeals;
export default favoritesSlice.reducer;