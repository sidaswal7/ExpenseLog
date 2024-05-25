import React from "react";

const ExpenseItem = ({money,description,category})=>{
    return(
        <li className="flex pl-32 mb-2">
            <h2 className="text-md font-medium basis-1/3">Money Spent: ${money}</h2>
            <h2 className="text-md font-medium basis-1/3">Description: {description}</h2>
            <h2 className="text-md font-medium basis-1/3">Category: {category}</h2>
        </li>
    )
}

export default ExpenseItem;