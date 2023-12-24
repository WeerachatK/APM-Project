// redux/slices/eventSlice.js

import { createSlice } from '@reduxjs/toolkit';
import eventData from '../../eventData.json';

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    data: eventData.Event,
  },
  reducers: {
  },
});

export default eventSlice.reducer;
