import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";


const ExpenseItem = ({amount,description,category,id,onDeleteExpense,onEditExpense})=>{
    const [editExpense, setEditExpense] = useState(false)

    const deleteHandler =async ()=>{
        try{
            const response = await fetch(`https://expense-log-21954-default-rtdb.firebaseio.com/expenses/${id}.json`,{
                method:'DELETE'
            })
            if(response.ok){
                alert("Expense item deleted successfully")
                onDeleteExpense(id,amount)
            } else{
                throw new Error("Something wrong!")
            }

        } catch(error){
            console.log(error.message)
        }
    }
    function editHandler(editedExpense){
        onEditExpense(editedExpense);
        setEditExpense(false);
    }
    return(
        <>
            <li className="flex px-5 mb-3 border-b-2 border-black items-center leading-relaxed">
                <h2 className="text-md font-medium basis-3/12">Amount Spent: &#8377;{amount}</h2>
                <h2 className="text-md font-medium basis-4/12">Description: {description}</h2>
                <h2 className="text-md font-medium basis-3/12">Category: {category}</h2>
                <button className="basis-1/12 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded shadow-md mb-3" onClick={()=>setEditExpense(true)}>Edit</button>
                <button className="basis-1/12 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow-md ml-2 mb-3" onClick={deleteHandler}>Delete</button>
            </li>
            {editExpense && (
                <ExpenseForm
                    editExpense={editExpense}
                    id={id}
                    category={category}
                    description={description}
                    amount={amount}
                    onEdit={editHandler}
                    onCloseForm={()=>setEditExpense(false)}
                />
            )}
        </>
        
    )
}

export default ExpenseItem;