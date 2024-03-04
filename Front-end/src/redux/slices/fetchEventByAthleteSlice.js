import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEventsByAthlete = createAsyncThunk(
  'events/fetchByAthlete',
  async (athleteId) => {
    const API_URL = import.meta.env.VITE_API_URL; // ต้องแน่ใจว่าคุณมี API_URL ถูกต้อง
    const response = await axios.get(`${API_URL}/competitions/athletes/${athleteId}`);
    return response.data;
  }
);

// สร้าง slice สำหรับการจัดการ state และ reducers
const fetchEventsByAthleteSlice = createSlice({
  name: 'fetchEventsByAthlete',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    // เพิ่ม reducers ถ้าจำเป็น
  },
  extraReducers: {
    [fetchEventsByAthlete.pending]: (state) => {
      state.loading = true;
    },
    [fetchEventsByAthlete.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchEventsByAthlete.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default fetchEventsByAthleteSlice.reducer;
