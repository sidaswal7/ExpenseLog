import React, { useRef } from "react";


const ExpenseForm = (props)=>{
    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const expenseFormHandler = (event)=>{
        event.preventDefault();
        const newExpense = {
            amount : Number(amountRef.current.value),
            description : descriptionRef.current.value,
            category : categoryRef.current.value
        };
        if(props.editExpense){
            updateExpense();
        } else{
            postExpense();
        }

        
        async function postExpense(){
            try{
                const response = await fetch('https://expense-log-21954-default-rtdb.firebaseio.com/expenses.json',{
                    method:'POST',
                    body: JSON.stringify(newExpense),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                console.log(response);
                if(response.ok){
                    alert("Expense added to the list successfully!")
                }
                const data = await response.json();
                props.onAddExpense({...newExpense, id:data.name})
                props.onHideForm()

            }catch(error){
                console.log(error)
            }
        }
        async function updateExpense(){
            const response = await fetch(`https://expense-log-21954-default-rtdb.firebaseio.com/expenses/${props.id}.json`,
                {
                    method: 'PUT',
                    body:JSON.stringify(newExpense),
                    headers:{
                        'Content-Type':'application/json'
                    },
                }
            );
            if(response.ok){
                props.onEdit({...newExpense, id:props.id})
                props.onCloseForm();
            }
        }
    }
    return(
        <div className="flex justify-center items-center mt-5">
            <form className="rounded shadow p-4" onSubmit={expenseFormHandler}>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-medium">{props.editExpense ?'Edit Expense':'Add Expenses'}</h1>
                    <button onClick={props.onHideForm} className="text-2xl text-red-500">&times;</button>
                </div>
                <div className="mt-2">
                    <label htmlFor="money" className="mb-2 text-md font-medium">Amount Spent: </label>
                    <input type="number" id="money" className="border border-slate-600 px-2 mb-2 w-full" ref={amountRef} defaultValue={props.amount}/>
                </div>
                <div className="mt-2">
                    <label htmlFor="description" className="mb-2 text-md font-medium">Description: </label>
                    <input type="text" id="description" className="border border-slate-600 px-2 mb-2 w-full" ref={descriptionRef} defaultValue={props.description}/>
                </div>
                <div className="mt-2">
                    <label htmlFor="category" className="text-md font-medium">Category: </label>
                    <select id="category" ref={categoryRef} className="block w-full border border-slate-600" defaultValue={props.category}>
                        <option value="Food">Food</option>
                        <option value="Fuel">Fuel</option>
                        <option value="Travel">Travel</option>
                        <option value="Education">Education</option>
                    </select>
                </div>
                <div className="flex justify-center items-center">
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 mt-3 rounded-md shadow-md">{props.editExpense ? 'Update   ':'Add Expense'}</button>
                </div>

            </form>

        </div>
    )
}

export default ExpenseForm;