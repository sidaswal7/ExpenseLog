import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";

const dummy_data = [{
    money:2000,
    description:"chicken biryani",
    category:"Food"
},{
    money:3000,
    description:"lagaan",
    category:"Movie"
},{
    money:4000,
    description:"trip to mumbai",
    category:"Travel"
}]
const Expenses = ()=>{
    const [showForm, setShowForm] = useState(false);
    const [expenses, setExpenses] = useState(dummy_data);

    const addExpenseHandler = (newExpense)=>{
        setExpenses((prev)=>[...prev, newExpense])
        setShowForm(false);
    }
    return(
        <section>
            <div className="flex justify-center items-center flex-col">
                {!showForm && <button className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded shadow-md" onClick={()=>setShowForm(true)}>Show Form</button>}  
                {showForm && <ExpenseForm onHideForm={()=>setShowForm(false)} onAddExpense = {addExpenseHandler}/>} 
            </div>
            <div>
                <ul className="border-2 border-slate-600 p-4 mt-10 mx-8 rounded-md shadow">
                    <h1 className="text-xl font-medium text-center mb-5">Expense List</h1>
                    {expenses.map((item)=><ExpenseItem
                        money={item.money}
                        description={item.description}
                        category={item.category}
                    />)} 
                </ul>
            </div>
        </section>
    )
}

export default Expenses;