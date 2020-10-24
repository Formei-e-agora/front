import { combineReducers } from 'redux';
import user from './userReducer';
import api from './apiReducer';
import job from './jobReducer';

const rootReducer = combineReducers({
    user,
    api,
    job
});

export default rootReducer;