import React from "react";
import Navigation from "./Navigation";

const Header = ()=>{
    return(
        <header className="flex justify-between items-center px-10 bg-blue-950 text-white py-7 mb-10">
            <h1 className="text-3xl font-bold">Expense<span className="text-green-500">Log</span></h1>
            <Navigation/>
        </header>
    )
}

export default Header;