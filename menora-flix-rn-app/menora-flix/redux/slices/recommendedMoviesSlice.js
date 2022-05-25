import {createSlice} from '@reduxjs/toolkit';

const recommendedMoviesSlice = createSlice({
    name:'recommendedMovies',
    initialState:{
        value: []
    },
    reducers:{
        setRecommendedMovies:(state,action)=>{
            state.value = action.payload.data;
        }
    }

});


export const { setRecommendedMovies } = recommendedMoviesSlice.actions;

export default  recommendedMoviesSlice.reducer;