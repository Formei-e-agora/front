import request from '../utils/request';
import { baseURL, portJob as port } from '../helpers';

export async function findCourseReq(courseId) {
    return request(baseURL + port + '/job/courseRequirements/find/courseRequirementsId/'+courseId, {
        method: 'GET'
    });
}

export async function createCourseReq(payload) {
    return request(baseURL + port + '/job/courseRequirements/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function updateCourseReq(courseId, payload) {
    return request(baseURL + port + '/job/courseRequirements/update/'+courseId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function deleteCourseReq(courseId) {
    return request(baseURL + port + '/job/courseRequirements/delete/'+courseId, {
        method: 'DELETE'
    });
}