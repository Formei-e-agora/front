import request from '../utils/request';
import { baseURL, portPerson as port } from '../helpers';

export async function findPerson(personId) {
    return request(baseURL + port + '/person/find/personId/'+personId, {
        method: 'GET'
    });
}

export async function verifyPerson(personId) {
    return request(baseURL + port + '/person/verify/personId/'+personId, {
        method: 'GET'
    });
}

export async function findPersonByEmail(email) {
    return request(baseURL + port + '/person/find/email/'+email, {
        method: 'GET'
    });
}

export async function findAll() {
    return request(baseURL + port + '/person/find/all', {
        method: 'GET'
    });
}

export async function createPerson(payload) {
    return request(baseURL + port + '/person/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function updatePerson(personId, payload) {
    return request(baseURL + port + '/person/update/'+personId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function deletePerson(personId) {
    return request(baseURL + port + '/person/delete/'+personId, {
        method: 'DELETE'
    });
}