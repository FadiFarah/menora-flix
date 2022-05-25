import {createSlice} from '@reduxjs/toolkit';

const userFavoriteMoviesIndicatorSlice = createSlice({
    name:'userFavoriteMovies',
    initialState: {
        value: 0
    },
    reducers: {
        setUserFavoritesIndicator: (state, action) => {
            state.value =Number(action.payload);
        }
    }
})

export const { setUserFavoritesIndicator } = userFavoriteMoviesIndicatorSlice.actions;
export default userFavoriteMoviesIndicatorSlice.reducer;