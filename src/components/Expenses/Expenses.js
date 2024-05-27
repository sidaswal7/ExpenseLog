import React, { useContext, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";
import ExpensesContext from "../../store/expenses-context";

const Expenses = ()=>{
    const [showForm, setShowForm] = useState(false);
    const expenseCtx = useContext(ExpensesContext)

    
    return(
        <section>
            <div className="flex justify-center items-center flex-col">
                {!showForm && <button className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded shadow-md" onClick={()=>setShowForm(true)}>Show Form</button>}  
                {showForm && <ExpenseForm onHideForm={()=>setShowForm(false)}/>} 
            </div>
            <div>
                <ul className="border-2 border-slate-600 p-4 mt-10 mx-8 rounded-md shadow">
                    <h1 className="text-3xl font-medium text-center mb-5">Expense List</h1>
                    {expenseCtx.expenses.map((item)=><ExpenseItem
                        key={item.id}
                        id={item.id}
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