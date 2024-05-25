import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";

const dummy_data = [{
    money:2000,
    description:"chicken biryani",
    category:"food"
},{
    money:3000,
    description:"lagaan",
    category:"movie"
},{
    money:4000,
    description:"trip to mumbai",
    category:"travel"
}]
const Expenses = ()=>{
    const [showForm, setShowForm] = useState(false);
    const [expenses, setExpenses] = useState(dummy_data);

    const addExpenseHandler = (newExpense)=>{
        setExpenses((prev)=>[...prev, newExpense])
        setShowForm(false);
    }
    return(
        <section className="flex justify-center items-center">
            <div className="flex justify-center items-center flex-col">
                {!showForm && <button className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded shadow-md" onClick={()=>setShowForm(true)}>Show Form</button>}  
                {showForm && <ExpenseForm onHideForm={()=>setShowForm(false)} onAddExpense = {addExpenseHandler}/>} 
                <ul>
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