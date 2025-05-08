import { createSlice } from '@reduxjs/toolkit';

const sortingSlice = createSlice({
  name: 'sorting',
  initialState: 'date', 
  reducers: {
    setSorting: (state, action) => action.payload,
  },
});

export const { setSorting } = sortingSlice.actions;
export default sortingSlice.reducer;
