import {createSlice} from '@reduxjs/toolkit';

const newMoviesSlice = createSlice({
    name:'newMovies',
    initialState:{
        value: []
    },
    reducers:{
        setNewMovies:(state,action)=>{
            state.value = action.payload.data;
        }
    }

});

export const { setNewMovies } = newMoviesSlice.actions;

export default  newMoviesSlice.reducer;