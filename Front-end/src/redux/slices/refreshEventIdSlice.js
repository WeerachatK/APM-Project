// slices/refreshEventIdSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const refreshEventIdSlice = createSlice({
  name: 'refreshEventId',
  initialState: {
    data: null, // หรือค่าเริ่มต้นที่เหมาะสม
  },
  reducers: {
    setRefreshEventId: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setRefreshEventId } = refreshEventIdSlice.actions;
export default refreshEventIdSlice.reducer;
