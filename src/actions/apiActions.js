import { 
    API_USER_DATA_REQUEST,
    API_USER_DATA_SUCCESS,
    API_USER_DATA_FAILED,
    API_PERSON_DATA_REQUEST,
    API_PERSON_DATA_SUCCESS,
    API_PERSON_DATA_FAILED,
    API_ADDRESS_DATA_REQUEST,
    API_ADDRESS_DATA_SUCCESS,
    API_ADDRESS_DATA_FAILED
 } from './actionTypes';

import { findUser } from '../services/auth';
import { findPerson } from '../services/person';
import { findAddress } from '../services/address';

export const apiUserDataRequest = () => ({
    type: API_USER_DATA_REQUEST
});

export const apiUserDataSuccess = user => ({
    type: API_USER_DATA_SUCCESS,
    user
});

export const apiUserDataFailed = () => ({
    type: API_USER_DATA_FAILED
});

export const apiPersonDataRequest = () => ({
    type: API_PERSON_DATA_REQUEST
});

export const apiPersonDataSuccess = person => ({
    type: API_PERSON_DATA_SUCCESS,
    person
});

export const apiPersonDataFailed = () => ({
    type: API_PERSON_DATA_FAILED
});

export const apiAddressDataRequest = () => ({
    type: API_ADDRESS_DATA_REQUEST
});

export const apiAddressDataSuccess = address => ({
    type: API_ADDRESS_DATA_SUCCESS,
    address
});

export const apiAddressDataFailed = () => ({
    type: API_ADDRESS_DATA_FAILED
});

export const getUserData = id => async dispatch => {
    dispatch(apiUserDataRequest());
    const json = await findUser(id);
    if (json.Status) {
        dispatch(apiUserDataSuccess(json.userData));
    } else {
        dispatch(apiUserDataFailed());
    }
};

export const getPersonData = id => async dispatch => {
    dispatch(apiPersonDataRequest());
    const json = await findPerson(id);
    if (json.Status) {
        dispatch(apiPersonDataSuccess(json.personData));
    } else {
        dispatch(apiPersonDataFailed());
    }
};

export const getAddressData = id => async dispatch => {
    dispatch(apiAddressDataRequest());
    const json = await findAddress(id);
    if (json.Status) {
        dispatch(apiAddressDataSuccess(json.userData));
    } else {
        dispatch(apiAddressDataFailed());
    }
};