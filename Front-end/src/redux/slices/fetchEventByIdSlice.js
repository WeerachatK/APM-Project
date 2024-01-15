import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import React from 'react';
import axios from 'axios';

export const fetchEventById = createAsyncThunk(
  'event/fetchEventById',
  async (eventId) => {
    const API_URL = import.meta.env.VITE_API_URL;;
    const response = await axios.get(`${API_URL}/competitions/events/${eventId}`);
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
