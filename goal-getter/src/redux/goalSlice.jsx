import { createSlice, nanoid } from '@reduxjs/toolkit';

const goalSlice = createSlice({
  name: 'goals',
  initialState: [],
  reducers: {
    addGoal: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, startDate, targetDate) => ({
        payload: {
          id: nanoid(),
          title,
          startDate,
          targetDate,
          completedDate: null,
          editing: false,
        },
      }),
    },

    markCompleted: (state, action) => {
      const goal = state.find(goal => goal.id === action.payload);
      if (goal) {
        goal.completedDate = new Date().toISOString();
      }
    },

    updateGoal: (state, action) => {
      const { id, title, startDate, targetDate } = action.payload;
      const goal = state.find(goal => goal.id === id);
      if (goal) {
        goal.title = title;
        goal.startDate = startDate;
        goal.targetDate = targetDate;
        goal.editing = false; 
      }
    },

    duplicateGoal: (state, action) => {
      const original = state.find(g => g.id === action.payload);
      if (original) {
        state.push({
          ...original,
          id: nanoid(),
          completedDate: null,
        });
      }
    },

    setEditing: (state, action) => {
      const id = action.payload;
      state.forEach(goal => {
        goal.editing = goal.id === id;
      });
    },
  },
});

export const { addGoal, markCompleted, updateGoal, duplicateGoal, setEditing } = goalSlice.actions;
export default goalSlice.reducer;
