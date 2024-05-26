import React, { useRef } from "react";

const ExpenseForm = (props)=>{
    const moneyRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const expenseFormHandler = (event)=>{
        event.preventDefault();
        const money = moneyRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;
        
        (async function addExpense(){
            try{
                const response = await fetch('https://expense-log-21954-default-rtdb.firebaseio.com/expenses.json',{
                    method:'POST',
                    body: JSON.stringify({
                        money: money,
                        description:description,
                        category:category
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                const data = await response.json();
                console.log(data);

            }catch(error){
                console.log(error)
            }
        })()
        props.onHideForm()
    }
    return(
        <div className="flex justify-center items-center mt-5">
            <form className="border-2 border-green-500 rounded shadow p-4" onSubmit={expenseFormHandler}>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium">Add your Expenses</h1>
                    <button onClick={props.onHideForm} className="text-2xl text-red-500">&times;</button>
                </div>
                <div className="mt-2">
                    <label htmlFor="money" className="mb-2 text-md font-medium">Money Spent: </label>
                    <input type="number" id="money" className="border border-slate-600 px-2 mb-2 w-full" ref={moneyRef}/>
                </div>
                <div className="mt-2">
                    <label htmlFor="description" className="mb-2 text-md font-medium">Description: </label>
                    <input type="text" id="description" className="border border-slate-600 px-2 mb-2 w-full" ref={descriptionRef}/>
                </div>
                <div className="mt-2">
                    <label htmlFor="category" className="text-md font-medium">Category: </label>
                    <select id="category" ref={categoryRef} className="block w-full border border-slate-600">
                        <option value="Food">Food</option>
                        <option value="Fuel">Fuel</option>
                        <option value="Salary">Travel</option>
                        <option value="Education">Education</option>
                    </select>
                </div>
                <div className="flex justify-center items-center">
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 mt-3 rounded-md shadow-md">Add Expense</button>
                </div>

            </form>

        </div>
    )
}

export default ExpenseForm;