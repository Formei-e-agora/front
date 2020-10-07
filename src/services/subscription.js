import request from '../utils/request';
import { baseURL, portJob as port } from '../helpers';

export async function findSubscription(subscriptionId) {
    return request(baseURL + port + '/job/subscription/find/subscriptionId/'+subscriptionId, {
        method: 'GET'
    });
}

export async function createSubscription(payload) {
    return request(baseURL + port + '/job/subscription/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function updateSubscription(subscriptionId, payload) {
    return request(baseURL + port + '/job/subscription/update/'+subscriptionId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function deleteSubscription(subscriptionId) {
    return request(baseURL + port + '/job/subscription/delete/'+subscriptionId, {
        method: 'DELETE'
    });
}