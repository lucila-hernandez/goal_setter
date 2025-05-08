import { configureStore } from '@reduxjs/toolkit';
import goalReducer from './goalSlice';
import filtersReducer from './filtersSlice';
import sortingReducer from './sortingSlice';

export const store = configureStore({
  reducer: {
    goals: goalReducer,
    filters: filtersReducer,
    sorting: sortingReducer,
  },
});
