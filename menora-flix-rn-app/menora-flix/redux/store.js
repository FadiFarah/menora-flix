import {configureStore} from '@reduxjs/toolkit';
import newMoviesSlice from './slices/newMoviesSlice';
import recommendedMoviesSlice from './slices/recommendedMoviesSlice';
import userAuthenticationSlice from './slices/userAuthenticationSlice';
import userFavoriteMoviesSlice from './slices/userFavoriteMoviesSlice';
import userFavoritesIndicatorSlice from './slices/userFavoritesIndicatorSlice';

const store = configureStore({
    reducer:{
        reducerRecommededMovies: recommendedMoviesSlice,
        reducerUserFavoriteMovies: userFavoriteMoviesSlice,
        reducerNewMovies: newMoviesSlice,
        reducerUserAuthenticationSlice: userAuthenticationSlice,
        reducerUserFavoritesIndicatorSlice: userFavoritesIndicatorSlice
    }
});

export default store;