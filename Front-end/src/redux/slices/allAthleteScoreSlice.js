import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state of the allAthleteScore slice
const initialState = {
    data: [],
    loading: false,
    error: null,
};

// Create the async thunk for fetching all athletes score
export const fetchAllAthleteScores = createAsyncThunk(
  'allAthleteScore/fetchAll',
  async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API_URL}/competitions/allAthlete`);
    return response.data; // Return the data from the API response
  }
);

// Create the slice
const allAthleteScoreSlice = createSlice({
  name: 'allAthleteScore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAthleteScores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAthleteScores.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllAthleteScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default allAthleteScoreSlice.reducer;
