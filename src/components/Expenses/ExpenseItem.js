import React from "react";

const ExpenseItem = ({money,description,category,id})=>{

    const deleteHandler =async ()=>{
        try{
            const response = await fetch(`https://expense-log-21954-default-rtdb.firebaseio.com/${id}/expenses.json`,{
                method:'DELETE'
            })
            if(response.ok){
                console.log("Expense item deleted successfully")
            } else{
                throw new Error("Something wrong!")
            }

        } catch(error){
            console.log(error.message)
        }
    }
    return(
        <li className="flex px-5 mb-3">
            <h2 className="text-md font-medium basis-3/12">Money Spent: ${money}</h2>
            <h2 className="text-md font-medium basis-4/12">Description: {description}</h2>
            <h2 className="text-md font-medium basis-3/12">Category: {category}</h2>
            <button className="basis-1/12 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded shadow-md">Edit</button>
            <button className="basis-1/12 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow-md ml-2" onClick={deleteHandler}>Delete</button>
        </li>
    )
}

export default ExpenseItem;