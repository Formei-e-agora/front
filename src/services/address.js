import request from '../utils/request';
import { baseURL, portPerson as port } from '../helpers';

export async function findAddress(addressId) {
    return request(baseURL + port + '/person/address/find/addressId/'+addressId, {
        method: 'GET'
    });
}

export async function verifyAddress(addressId) {
    return request(baseURL + port + '/person/address/verify/addressId/'+addressId, {
        method: 'GET'
    });
}

export async function createAddress(payload) {
    return request(baseURL + port + '/person/address/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function updateAddress(addressId, payload) {
    return request(baseURL + port + '/person/address/update/'+addressId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

export async function deleteAddress(addressId) {
    return request(baseURL + port + '/person/address/delete/'+addressId, {
        method: 'DELETE'
    });
}