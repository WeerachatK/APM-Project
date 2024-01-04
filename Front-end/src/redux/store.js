import { configureStore } from '@reduxjs/toolkit';
import displayReducer from './slices/displaySlice';
import filterReducer from './slices/filterSlice'; 
import profileReducer from './slices//profileSlice';
import eventDisplayReducer from './slices/eventDisplaySlice';
import filterDayReducer from './slices/filterDaySlice';
import filterSexReducer from './slices/filterSexSlice';
import eventReducer from './slices/eventSlice';
import sportFilterReducer from './slices/sportFilterSlice';
import fetchEventByIdSlice from './slices/fetchEventByIdSlice';
import sportReducer from './slices/sportSlice';
export const store = configureStore({
  reducer: {
    display: displayReducer,
    filter: filterReducer,    
    profile: profileReducer,
    eventDisplay: eventDisplayReducer,
    filterDay: filterDayReducer,
    filterSex: filterSexReducer,
    event: eventReducer,
    sportFilter: sportFilterReducer,
    fetchEventById: fetchEventByIdSlice,
    sport: sportReducer
  },
});

export default store;