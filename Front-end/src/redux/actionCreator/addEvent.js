// actionCreators.js
import axios from 'axios';

export const addEvent = (eventData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/events', eventData);
      dispatch({ type: 'ADD_EVENT_SUCCESS', payload: response.data });
      // ตัวอย่างการ dispatch ค่าไปยัง reducer หลังจากที่ event ถูกเพิ่มเรียบร้อย
    } catch (error) {
      dispatch({ type: 'ADD_EVENT_FAILURE', error });
      // จัดการกับข้อผิดพลาดที่นี่
    }
  };
};
