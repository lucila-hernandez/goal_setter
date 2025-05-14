import { configureStore } from '@reduxjs/toolkit';
import goalReducer from './goalSlice';
import filtersReducer from './filtersSlice';
import sortingReducer from './sortingSlice';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    goals: goalReducer,
    filters: filtersReducer,
    sorting: sortingReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
