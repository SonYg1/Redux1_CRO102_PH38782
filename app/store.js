
import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from '../features/expensesSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});
