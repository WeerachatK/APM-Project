import { createSlice } from '@reduxjs/toolkit';

export const sportFilterSlice = createSlice({
  name: 'sportFilter',
  initialState: {
    value: 'All',
  },
  reducers: {
    setSportFilter: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSportFilter } = sportFilterSlice.actions;

export const selectSportFilter = (state) => state.sportFilter.value;

export default sportFilterSlice.reducer;
