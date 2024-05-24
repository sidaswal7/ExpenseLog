import React, { createContext } from "react";

const AuthContext = createContext({

})

export const AuthContextProvider = (props)=>{

    const authContext = {

    }
    return(
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext