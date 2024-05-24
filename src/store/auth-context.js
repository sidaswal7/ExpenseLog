import React, { createContext, useState } from "react";

const AuthContext = createContext({
    token:'',
    hasAccount: false,
    login:(token)=>{},
    logout:()=>{}
})

export const AuthContextProvider = (props)=>{
    const [token,setToken] = useState(null)
    const userHasAccount = !!token;
    const loginHandler = (token)=>{
        setToken(token);
    }
    const logoutHandler = ()=>{
        setToken(null);
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