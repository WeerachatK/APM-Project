import { createSlice } from '@reduxjs/toolkit';

export const displaySlice = createSlice({
  name: 'display',
  initialState: '',
  reducers: {
    setDisplay: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDisplay } = displaySlice.actions;

export default displaySlice.reducer;
