import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ()=>{
    return(
        <nav className="flex">
            <NavLink to="/home" className="mr-5 hover:text-yellow-400">HOME</NavLink>
            <NavLink to="/products" className="mr-5 hover:text-yellow-400">PRODUCTS</NavLink>
            <NavLink to="/about" className="hover:text-yellow-400">ABOUT</NavLink>
        </nav>
    )
}
export default Navigation;