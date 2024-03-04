import axios from 'axios';
import { fetchEvents } from '../slices/eventSlice';
import { fetchAthletes } from '../slices/athleteSlice';
import { fetchEventById } from '../slices/fetchEventByIdSlice'
// Action Types
const POST_DATA_START = 'POST_DATA_START';
const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';
const POST_DATA_FAILURE = 'POST_DATA_FAILURE';

// Action Creators
const postDataStart = () => ({
  type: POST_DATA_START,
});

const postDataSuccess = (data) => ({
  type: POST_DATA_SUCCESS,
  payload: data,
});

const postDataFailure = (error) => ({
  type: POST_DATA_FAILURE,
  payload: error,
});

// Async Action Creator with Axios
export const postData = (url, formData, eventId) => async (dispatch) => {
  dispatch(postDataStart());
  try {
    const response = await axios.post(url, formData);
    dispatch(postDataSuccess(response.data));
    dispatch(fetchEvents());
    dispatch(fetchAthletes());
    if (eventId) { 
      dispatch(fetchEventById(eventId)); 
    }

  } catch (error) {
    dispatch(postDataFailure(error.message));
  }
};
