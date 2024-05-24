import React from "react";
import Navigation from "./Navigation";

const Header = ()=>{
    return(
        <header className="flex justify-between items-center px-10 bg-blue-950 text-white py-5">
            <h1 className="text-xl">ExpenseLog.com</h1>
            <Navigation/>
        </header>
    )
}

export default Header;