import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expenses:[], totalExpense:0};

const expenseSlice = createSlice({
    name:'expense',
    initialState: initialExpenseState,
    reducers:{
        fetchExpense(state,action){
            state.expenses = action.payload.fetchData;
            state.totalExpense = action.payload.totalExpense;
        },
        addExpense(state,action){
            state.expenses = [...state.expenses, action.payload];
            state.totalExpense = state.totalExpense + action.payload.amount;
        },
        editExpense(state,action){
            const updatedExpenses = state.expenses.map((expense)=>{
                if(expense.id === action.payload.id){
                    state.totalExpense = state.totalExpense - expense.amount + action.payload.amount;
                    return action.payload;
                }
                return expense
            });
            state.expenses = updatedExpenses;
        },
        deleteExpense(state,action){
            const updatedExpenses = state.expenses.filter((expense)=>{
                return expense.id !== action.payload.delId;
            })
            state.expenses = updatedExpenses;
            state.totalExpense = state.totalExpense - action.payload.amount;
        }
    }

})

export const {fetchExpense, addExpense, editExpense, deleteExpense} = expenseSlice.actions;


export default expenseSlice.reducer;