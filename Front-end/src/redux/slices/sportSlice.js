import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// สร้าง async thunk สำหรับการดึงข้อมูล sports
export const fetchSports = createAsyncThunk(
  'sport/fetchSports',
  async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API_URL}/sports`);
   return response.data; // ส่งกลับข้อมูลที่ได้จาก API
 }
);

const sportSlice = createSlice({
  name: 'sport',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // reducers ถ้ามี
  },
  extraReducers: {
    [fetchSports.pending]: (state) => {
      state.loading = true;
    },
    [fetchSports.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchSports.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default sportSlice.reducer;
