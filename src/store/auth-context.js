import React, { createContext, useState } from "react";

const AuthContext = createContext({
    token:'',
    hasAccount: false,
    login:(token)=>{},
    logout:()=>{}
})

export const AuthContextProvider = (props)=>{
    const initialToken = localStorage.getItem('token')
    const [token,setToken] = useState(initialToken)
    const userHasAccount = !!token;
    const loginHandler = (token)=>{
        setToken(token);
        localStorage.setItem('token',token);
    }
    const logoutHandler = ()=>{
        setToken(null);
        localStorage.removeItem('token')
    }
    const authContext = {
        token: token,
        hasAccount: userHasAccount,
        login: loginHandler,
        logout:logoutHandler
    }
    return(
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext