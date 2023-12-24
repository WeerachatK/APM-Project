// profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: null,
  reducers: {
    setProfile: (state, action) => action.payload,
    clearProfile: () => null
  }
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
