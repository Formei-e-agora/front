import request from '../utils/request';
import { baseURL, portJob as port } from '../helpers';

export async function findJob(jobId) {
    return request(baseURL + port + '/job/find/jobId/'+jobId, {
        method: 'GET'
    });
}

export async function findAllJobs() {
    return request(baseURL + port + '/job/find/all/', {
        method: 'GET'
    });
}

export async function createJob(payload) {
    return request(baseURL + port + '/job/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function updateJob(jobId, payload) {
    return request(baseURL + port + '/job/update/'+jobId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function deleteJob(jobId) {
    return request(baseURL + port + '/job/delete/'+jobId, {
        method: 'DELETE'
    });
}

export async function findJobByCourse(course) {
    return request(baseURL + port + '/job/find/course/'+course+'/number/50', {
        method: 'GET'
    });
}

export async function findJobByProfessorId(professorId) {
    return request(baseURL + port + '/job/find/professorId/'+professorId+'/number/50', {
        method: 'GET'
    });
}

export async function findMostPopularJobs(jobId) {
    return request(baseURL + port + '/job/find/mostPopular', {
        method: 'GET'
    });
}