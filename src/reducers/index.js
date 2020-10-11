import { combineReducers } from 'redux';
import user from './userReducer';
import api from './apiReducer';

const rootReducer = combineReducers({
    user,
    api
});

export default rootReducer;