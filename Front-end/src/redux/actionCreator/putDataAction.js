import axios from 'axios';
import { fetchEvents } from '../slices/eventSlice';
import { fetchAthletes } from '../slices/athleteSlice';
import { fetchEventById } from '../slices/fetchEventByIdSlice'

const PUT_DATA_START = 'PUT_DATA_START';
const PUT_DATA_SUCCESS = 'PUT_DATA_SUCCESS';
const PUT_DATA_FAILURE = 'PUT_DATA_FAILURE';

const putDataStart = () => ({
  type: PUT_DATA_START,
});

const putDataSuccess = (data) => ({
  type: PUT_DATA_SUCCESS,
  payload: data,
});

const putDataFailure = (error) => ({
  type: PUT_DATA_FAILURE,
  payload: error,
});

export const putData = (url, formData, eventId) => async (dispatch) => {
  dispatch(putDataStart());
  try {
    const response = await axios.put(url, formData);
    dispatch(putDataSuccess(response.data));
    dispatch(fetchEvents());
    dispatch(fetchAthletes());
    if (eventId) { 
      dispatch(fetchEventById(eventId)); 
    }
  } catch (error) {
    dispatch(putDataFailure(error.message));
  }
};
