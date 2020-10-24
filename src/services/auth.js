import request from '../utils/request';
import { baseURL, portAuth as port } from '../helpers';

export async function findUser(userId) {
    return request(baseURL + port + '/user/find/userId/'+userId, {
        method: 'GET'
    });
}

export async function findUnlockInfo(userId) {
    return request(baseURL + port + '/user/find/unlockInfo/userId/'+userId, {
        method: 'GET'
    });
}

export async function verifyUser(userId) {
    return request(baseURL + port + '/user/verify/userId/'+userId, {
        method: 'GET'
    });
}

export async function login(payload) {
    return request(baseURL + port + '/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function resetPassword(payload) {
    return request(baseURL + port + '/user/reset/password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function changePassword(payload) {
    return request(baseURL + port + '/user/update/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function acceptUser(userId) {
    return request(baseURL + port + '/user/accept/'+userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}