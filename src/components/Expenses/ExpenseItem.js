import React from "react";

const ExpenseItem = ({money,description,category})=>{
    return(
        <li className="flex justify-evenly">
            <h2>Money Spent: ${money}</h2>
            <h2>Description: {description}</h2>
            <h2>Category: {category}</h2>
        </li>
    )
}

export default ExpenseItem;