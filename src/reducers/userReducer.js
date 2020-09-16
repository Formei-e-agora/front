import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/actionTypes';

const initialState = {
    token: null, 
    isAuthenticated: false
}

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return { token: null, isAuthenticated: false };
    default:
      return state;
  }
}