import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    jwtToken: localStorage.getItem('jwtToken'),
    isLoggedIn: !!localStorage.getItem('jwtToken'),
    userName:null
};

const authSlice = createSlice({
    name:'auth',
    initialState: initialAuthState,
    reducers:{
        login(state, action){
            localStorage.setItem('jwtToken',action.payload.jwtToken)
            state.isLoggedIn = true;
            state.jwtToken = action.payload.jwtToken;
            state.userName = action.payload.userName;
        },
        logout(state){
            localStorage.removeItem('jwtToken')
            state.isLoggedIn = false;
            state.jwtToken = null;
            state.userName = null;
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer