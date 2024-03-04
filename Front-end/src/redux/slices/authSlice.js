import {LOGIN_SUCCESS, LOGOUT} from '../actionCreator/loginAction';

// // Actions
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGOUT = 'LOGOUT';

// // Action creators
// export const loginSuccess = (user, token) => ({
//   type: LOGIN_SUCCESS,
//   payload: { user, token }
// });

// export const logout = () => ({
//   type: LOGOUT,
// });


const initialState = {
  currentUser: null,
  token: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
