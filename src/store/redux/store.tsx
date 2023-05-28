import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favorites'
import generalReducer from './general'

export const store = configureStore({
    reducer: {
        favoriteMeals: favoritesReducer,
		general: generalReducer
    }
})