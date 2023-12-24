import { createSlice } from '@reduxjs/toolkit';

export const eventDisplaySlice = createSlice({
  name: 'eventDisplay',
  initialState: 'start-list',
  reducers: {
    setEventDisplay: (state, action) => {
      return action.payload;
    },
  },
});

export const { setEventDisplay } = eventDisplaySlice.actions;

export default eventDisplaySlice.reducer;
