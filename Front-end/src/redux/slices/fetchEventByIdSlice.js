import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEventById = createAsyncThunk(
  'event/fetchEventById',
  async (eventId) => {
    const response = await axios.get(`http://localhost:3001/api/competitions/events/${eventId}`);
    return response.data;
  }
);

const fetchEventByIdSlice = createSlice({
  name: 'fetchEventById',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Reducers ถ้ามี
  },
  extraReducers: {
    [fetchEventById.pending]: (state) => {
      state.loading = true;
    },
    [fetchEventById.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchEventById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default fetchEventByIdSlice.reducer;
