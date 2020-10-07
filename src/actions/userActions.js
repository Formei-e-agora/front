import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes';
import { login as serviceLogin } from '../services/auth';

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const login = credentials => async dispatch => {
    const json = await serviceLogin(credentials);
    if (json.Status) {
        sessionStorage.setItem("token", json.token);
        sessionStorage.setItem("userData", json.contactData);
        const user = { token: json.token, isAuthenticated: true };
        dispatch(userLoggedIn(user));
    } else {
        return json;
    }

};

export const logout = () => dispatch => {
    sessionStorage.clear();
    dispatch(userLoggedOut());
};