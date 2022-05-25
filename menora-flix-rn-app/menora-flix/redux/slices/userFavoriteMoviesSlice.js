import {createSlice} from '@reduxjs/toolkit';

const userFavoriteMoviesSlice = createSlice({
    name:'userFavoriteMovies',
    initialState: {
        value: []
    },
    reducers: {
        addUserFavoriteMovie: (state, action) => {
            state.value = [...state.value, action?.payload];
        },
        removeUserFavoriteMovie: (state, action) => {
            const index = state.value.findIndex(value => value.imdbID === action.payload.imdbID);
            if(index !== -1) {
                state.value.splice(index, 1);
            }
            else {
                state.value = state.value;
            }
        },
        setUserFavoriteMovies: (state, action) => {
            state.value = action.payload.data;
        }
    }
})

export const { setUserFavoriteMovies, addUserFavoriteMovie, removeUserFavoriteMovie } = userFavoriteMoviesSlice.actions;
export default userFavoriteMoviesSlice.reducer;