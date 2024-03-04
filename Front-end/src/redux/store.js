import { configureStore } from '@reduxjs/toolkit';
import displayReducer from './slices/displaySlice';
import filterReducer from './slices/filterSlice'; 
import profileReducer from './slices//profileSlice';
import eventDisplayReducer from './slices/eventDisplaySlice';
import filterDayReducer from './slices/filterDaySlice';
import filterSexReducer from './slices/filterSexSlice';
import filterTimeReducer from './slices/filterTimeSlice';
import eventReducer from './slices/eventSlice';
import sportFilterReducer from './slices/sportFilterSlice';
import fetchEventByIdReducer from './slices/fetchEventByIdSlice';
import fetchEventByAthleteReducer from './slices/fetchEventByAthleteSlice';
import sportReducer from './slices/sportSlice';
import athleteReducer from './slices/athleteSlice';
import roleReducer from './slices/roleSlice';
import systemDisplayReducer from './slices/systemDisplaySlice';
import refreshEventIdReducer from './slices/refreshEventIdSlice';
import allAthleteScoreReducer from './slices/allAthleteScoreSlice';
import { authReducer } from './slices/authSlice';
export const store = configureStore({
  reducer: {
    display: displayReducer,
    filter: filterReducer,    
    profile: profileReducer,
    eventDisplay: eventDisplayReducer,
    filterDay: filterDayReducer,
    filterSex: filterSexReducer,
    filterTime: filterTimeReducer,
    event: eventReducer,
    allAthleteScore: allAthleteScoreReducer,
    sportFilter: sportFilterReducer,
    fetchEventById: fetchEventByIdReducer,
    fetchEventsByAthlete : fetchEventByAthleteReducer,
    sport: sportReducer,
    athlete: athleteReducer,
    role: roleReducer,
    systemDisplay: systemDisplayReducer,
    auth: authReducer,
    refreshEventId: refreshEventIdReducer,
  },
});

export default store;