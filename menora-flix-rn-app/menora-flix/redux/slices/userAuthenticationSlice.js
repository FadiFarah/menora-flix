import {createSlice} from '@reduxjs/toolkit';

const userAuthenticationSlice = createSlice({
    name:'userAuthentication',
    initialState:{
        value: false
    },
    reducers:{
        setIsUserAuthenticated:(state, action)=>{
            state.value = action.payload;
        }
    }

});


export const { setIsUserAuthenticated } = userAuthenticationSlice.actions;

export default  userAuthenticationSlice.reducer;