import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { BrowserRouter } from 'react-router-dom';
import { ExpenseContextProvider } from './store/expenses-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ExpenseContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ExpenseContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

