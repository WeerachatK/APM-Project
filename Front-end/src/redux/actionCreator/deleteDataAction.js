import axios from 'axios';
import { fetchEvents } from '../slices/eventSlice';
import { fetchEventById } from '../slices/fetchEventByIdSlice'
import { fetchAthletes } from '../slices/athleteSlice';


// Action Types
const DELETE_DATA_START = 'DELETE_DATA_START';
const DELETE_DATA_SUCCESS = 'DELETE_DATA_SUCCESS';
const DELETE_DATA_FAILURE = 'DELETE_DATA_FAILURE';

// Action Creators
const deleteDataStart = () => ({
    type: DELETE_DATA_START,
});

const deleteDataSuccess = (id) => ({
    type: DELETE_DATA_SUCCESS,
    payload: id,
});

const deleteDataFailure = (error) => ({
    type: DELETE_DATA_FAILURE,
    payload: error,
});

// Async Action Creator with Axios
export const deleteData = (url, id, eventId) => async (dispatch) => {
    dispatch(deleteDataStart());
    try {
        await axios.delete(`${url}/${id}`);
        dispatch(deleteDataSuccess(id));
        dispatch(fetchEvents());
        dispatch(fetchAthletes());
        if (eventId) {
            dispatch(fetchEventById(eventId));
        }
    } catch (error) {
        dispatch(deleteDataFailure(error.message));
    }
};
