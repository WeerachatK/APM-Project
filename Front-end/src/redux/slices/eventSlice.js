import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// สร้าง async thunk
export const fetchEvents = createAsyncThunk(
  'event/fetchEvents',
  async () => {
    const response = await axios.get('http://localhost:3001/api/events');
    return response.data; // ส่งกลับข้อมูลที่ได้จาก API
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.loading = true;
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchEvents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default eventSlice.reducer;

