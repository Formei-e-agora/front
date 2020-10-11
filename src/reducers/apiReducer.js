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
} from '../actions/actionTypes';

const initialState = {
    user: null,
    address: null,
    person: null,
    loading: {
        user: false,
        address: false,
        person: false
    }
}

export default function api(state = initialState, action = {}) {
    switch (action.type) {
        case API_USER_DATA_REQUEST:
            return { ...state, loading: { ...state.loading, user: true } };
        case API_USER_DATA_SUCCESS:
            return { ...state, user: action.user, loading: { ...state.loading, user: false } };
        case API_USER_DATA_FAILED:
            return { ...state, loading: { ...state.loading, user: false } };
        case API_PERSON_DATA_REQUEST:
            return { ...state, loading: { ...state.loading, person: true } };
        case API_PERSON_DATA_SUCCESS:
            return { ...state, person: action.person, loading: { ...state.loading, person: false } };
        case API_PERSON_DATA_FAILED:
            return { ...state, loading: { ...state.loading, person: false } };
        case API_ADDRESS_DATA_REQUEST:
            return { ...state, loading: { ...state.loading, address: true } };
        case API_ADDRESS_DATA_SUCCESS:
            return { ...state, address: action.address, loading: { ...state.loading, address: false } };
        case API_ADDRESS_DATA_FAILED:
            return { ...state, loading: { ...state.loading, address: false } };
        default:
            return state;
    }
}