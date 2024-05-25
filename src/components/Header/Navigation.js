import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Navigation = ()=>{
    const authCtx = useContext(AuthContext);
    return(
        <nav className="flex items-center">
            <NavLink to="/home" className="mr-5 hover:text-yellow-400">HOME</NavLink>
            <NavLink to="/products" className="mr-5 hover:text-yellow-400">PRODUCTS</NavLink>
            <NavLink to="/about" className="hover:text-yellow-400 mr-5">ABOUT</NavLink>
            {authCtx.isLoggedIn && <button className="bg-green-500 hover:bg-green-600 px-2 py-1 text-white shadow rounded" onClick={authCtx.logout}>Logout</button>}
        </nav>
    )
}
export default Navigation;