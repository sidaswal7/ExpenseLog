import React, { createContext, useEffect, useState, useCallback } from "react";

const ExpensesContext = createContext({
    expenses:[]
})

export const ExpenseContextProvider = (props)=>{

    const [expenses, setExpenses] = useState([]);

    const addExpense = useCallback(async ()=>{
        try{
            const response = await fetch('https://expense-log-21954-default-rtdb.firebaseio.com/expenses.json')
            if(!response.ok){
                alert('Something went wrong')
            }
            const data = await response.json();
            console.log(data);
            let loadedData = [];
            for(let key in data){
                loadedData.push({
                    id:key,
                    money: data[key].money,
                    description: data[key].description,
                    category: data[key].category
                })
            }
            setExpenses(loadedData);

        } catch(error){
            console.log(error);
        }
    },[])
    useEffect(()=>{
        addExpense()
    },[addExpense])
    const expensesContext = {
        expenses: expenses
    }
    return(
        <ExpensesContext.Provider value={expensesContext}>
            {props.children}
        </ExpensesContext.Provider>
    )
}
export default ExpensesContext;