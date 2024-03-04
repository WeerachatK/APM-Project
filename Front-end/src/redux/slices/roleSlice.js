import { createSlice } from '@reduxjs/toolkit';

export const roleSlice = createSlice({
  name: 'role',
  initialState: '',
  reducers: {
    setRole: (state, action) => {
      return action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
