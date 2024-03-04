import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../../../redux/actionCreator/loginAction';

export function useAuth() {
  const dispatch = useDispatch();
  const { currentUser, token, isAuthenticated } = useSelector(state => state.auth);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json(); 
      dispatch(loginSuccess(data.username, data.token));

      return data;
    } catch (error) {
      console.error("Error during login:", error);
      // จัดการกับข้อผิดพลาดที่นี่ เช่น แสดงข้อความแจ้งเตือนใน UI
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    currentUser,
    token,
    isAuthenticated,
    login,
    logout: logoutUser,
  };
}
