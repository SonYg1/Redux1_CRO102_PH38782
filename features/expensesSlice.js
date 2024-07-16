
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action) => {
      const { id, updatedExpense } = action.payload;
      const existingExpense = state.expenses.find(expense => expense.id === id);
      if (existingExpense) {
        Object.assign(existingExpense, updatedExpense);
      }
    },
    deleteExpense: (state, action) => {
      const id = action.payload;
      state.expenses = state.expenses.filter(expense => expense.id !== id);
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } = expensesSlice.actions;

export const selectExpenses = state => state.expenses.expenses;

export const selectTotalIncome = state => {
  return state.expenses.expenses.reduce((total, expense) => {
    if (expense.type === 'income') {
      return total + parseFloat(expense.amount);
    }
    return total;
  }, 0);
};

export const selectTotalExpense = state => {
  return state.expenses.expenses.reduce((total, expense) => {
    if (expense.type === 'expense') {
      return total + parseFloat(expense.amount);
    }
    return total;
  }, 0);
};

export const selectFilteredExpenses = (state, searchTerm) => {
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();
  return state.expenses.expenses.filter(expense =>
    expense.title.toLowerCase().includes(normalizedSearchTerm)
  );
};

export default expensesSlice.reducer;
