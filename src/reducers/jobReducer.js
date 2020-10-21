import {
    JOB_FEED_DATA_REQUEST,
    JOB_FEED_DATA_SUCCESS,
    JOB_FEED_DATA_FAILED
} from '../actions/actionTypes';

const initialState = {
    feed: null,
    loading: {
        feed: false
    }
}

export default function job(state = initialState, action = {}) {
    switch (action.type) {
        case JOB_FEED_DATA_REQUEST:
            return { ...state, loading: { ...state.loading, feed: true } };
        case JOB_FEED_DATA_SUCCESS:
            return { ...state, feed: action.feed, loading: { ...state.loading, feed: false } };
        case JOB_FEED_DATA_FAILED:
            return { ...state, feed: null, loading: { ...state.loading, feed: false } };
        default:
            return state;
    }
}