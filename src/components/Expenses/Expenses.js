import React, { useState} from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";
import { useSelector, useDispatch } from "react-redux";
import {
  addExpense,
  editExpense,
  deleteExpense,
} from "../../store/expense-slice";

const Expenses = () => {
  const [showForm, setShowForm] = useState(false);
  const {expenses, totalExpense} = useSelector((state) => state.expense);
  const dispatch = useDispatch();

  function handleAddExpense(newExpense) {
    dispatch(addExpense(newExpense));
  }
  function handleEditExpense(editedExpense) {
    dispatch(editExpense(editedExpense));
  }
  function handleDeleteExpense(delId, amount) {
    dispatch(deleteExpense({ delId, amount }));
  }
  let content =
    expenses.length > 0 ? (
      <ul className="border-2 border-slate-600 p-4 mt-10 mx-8 rounded-md shadow">
        <h1 className="text-3xl font-medium text-center mb-5">Expense List</h1>
        {expenses.map((item) => (
          <ExpenseItem
            key={item.id}
            id={item.id}
            amount={item.amount}
            description={item.description}
            category={item.category}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        ))}
      </ul>
    ) : (
      <p className="text-center text-lg mt-10">No expenses found!</p>
    );
  return (
    <section>
      <div className="flex justify-center items-center flex-col">
        {!showForm && (
          <button
            className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded shadow-md"
            onClick={() => setShowForm(true)}
          >
            Show Form
          </button>
        )}
        {showForm && (
          <ExpenseForm
            onHideForm={() => setShowForm(false)}
            onAddExpense={handleAddExpense}
          />
        )}
      </div>
      <div>
        <p className="text-center text-lg mt-8">
          Total Expense: <span>{totalExpense}</span>
        </p>
      </div>
      {totalExpense > 10000 && <div className="flex justify-center items-center">
        <button className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-sm shadow-md mt-10">Activate Pro</button>
        </div>}
      {content}
    </section>
  );
};

export default Expenses;
