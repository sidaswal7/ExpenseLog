import React, { createContext, useState } from "react";

const AuthContext = createContext({
    token:'',
    displayName:'',
    hasAccount: false,
    login:(token)=>{},
    logout:()=>{}
})

export const AuthContextProvider = (props)=>{
    const initialToken = localStorage.getItem('token')
    const [token,setToken] = useState(initialToken)
    const [displayName, setDisplayName] = useState(localStorage.getItem('displayName'))
    const userHasAccount = !!token;
    const loginHandler = (token, displayName)=>{
        setToken(token);
        setDisplayName(displayName);
        console.log(token,displayName)
        localStorage.setItem('token',token);
        localStorage.setItem('displayName',displayName)
    }
    const logoutHandler = ()=>{
        setToken(null);
        setDisplayName(null);
        localStorage.removeItem('token')
        localStorage.removeItem('displayName')
    }
    const authContext = {
        token: token,
        displayName: displayName,
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