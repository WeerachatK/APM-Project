import { createSlice } from '@reduxjs/toolkit';

export const filterDaySlice = createSlice({
  name: 'filterDay',
  initialState: 'All',
  reducers: {
    setFilterDay: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilterDay } = filterDaySlice.actions;

export default filterDaySlice.reducer;


