// Actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

// Action creators
export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token }
});

export const logout = () => ({
  type: LOGOUT,
});

