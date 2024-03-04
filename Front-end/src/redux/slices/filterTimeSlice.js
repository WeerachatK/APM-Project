import { createSlice } from '@reduxjs/toolkit';

export const filterTimeSlice = createSlice({
  name: 'filterTime',
  initialState: 'All',
  reducers: {
    setFilterTime: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilterTime } = filterTimeSlice.actions;

export default filterTimeSlice.reducer;


