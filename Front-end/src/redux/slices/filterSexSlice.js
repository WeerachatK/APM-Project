
import { createSlice } from '@reduxjs/toolkit';

export const filterSexSlice = createSlice({
  name: 'filterSex',
  initialState: 'All',
  reducers: {
    setFilterSex: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilterSex } = filterSexSlice.actions;

export default filterSexSlice.reducer;

