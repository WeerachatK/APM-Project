import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAthletes = createAsyncThunk(
  'athletes/fetchAthletes',
  async () => { 
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API_URL}/athletes`);
    return response.data;
  }
);

const athleteSlice = createSlice({
  name: 'athletes',
  initialState: {
    data: [], 
    loading: false, 
    error: null,
  },
  reducers: {
  
  },
  extraReducers: {
    [fetchAthletes.pending]: (state) => {
      state.loading = true;
    },
    [fetchAthletes.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload; 
    },
    [fetchAthletes.rejected]: (state, action) => {
      state.loading = false; 
      state.error = action.error.message; 
    },
  },
});

export default athleteSlice.reducer; 
