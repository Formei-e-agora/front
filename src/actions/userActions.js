import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes';

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const login = credentials => dispatch => {
    console.log("User/Pass", credentials);
    // do the api login request here
    const user = { token: "asd", isAuthenticated: true };
    dispatch(userLoggedIn(user));
};

export const logout = () => dispatch => {
    // do the api logout request here
    dispatch(userLoggedOut());
};