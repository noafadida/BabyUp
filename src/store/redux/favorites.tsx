import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        ids: []
    },
    reducers: {
        updateState: ( state: any, action : any) => {
            state.ids = action.payload.ids
        },
        addFavorite: ( state: any, action : any) => {
            state.ids.push(action.payload.id)
        },
        removeFavorite: (state: any, action : any) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1)
        }
    }
});


export const updateState: any = favoritesSlice.actions.updateState;
export const addFavorite: any = favoritesSlice.actions.addFavorite;
export const removeFavorite: any = favoritesSlice.actions.removeFavorite;
export default favoritesSlice.reducer;