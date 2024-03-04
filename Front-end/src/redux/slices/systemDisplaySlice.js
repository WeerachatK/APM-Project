import { createSlice } from '@reduxjs/toolkit';

export const systemDisplaySlice = createSlice({
  name: 'systemDisplay',
  initialState: 'event',
  reducers: {
    setSystemDisplay: (state, action) => {
      return action.payload;
    },

  },
});

export const { setSystemDisplay } = systemDisplaySlice.actions;

export default systemDisplaySlice.reducer;
