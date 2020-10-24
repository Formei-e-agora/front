import { 
    JOB_FEED_DATA_REQUEST,
    JOB_FEED_DATA_SUCCESS,
    JOB_FEED_DATA_FAILED,
    SELECT_JOB,
    SELECT_JOB_CLEAR
 } from './actionTypes';
import { findJobByCourse, findJobByProfessorId } from '../services/job';

export const jobFeedDataRequest = () => ({
    type: JOB_FEED_DATA_REQUEST
});

export const jobFeedDataSuccess = feed => ({
    type: JOB_FEED_DATA_SUCCESS,
    feed
});

export const jobFeedDataFailed = () => ({
    type: JOB_FEED_DATA_FAILED
});

export const selectJob = jobId => ({
    type: SELECT_JOB,
    jobId
});

export const selectJobClear = () => ({
    type: SELECT_JOB_CLEAR
});


export const getJobFeedData = payload => async dispatch => {
    // payload : course if student, professorId if professor
    dispatch(jobFeedDataRequest());
    const json = (payload.course)
    ? await findJobByCourse(payload.course)
    : await findJobByProfessorId(payload.professorId)
    if (json.Status) {
        dispatch(jobFeedDataSuccess(json.jobs));
    } else {
        dispatch(jobFeedDataFailed());
    }
};