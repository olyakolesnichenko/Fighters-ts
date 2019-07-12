"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_URL = 'https://back-project.herokuapp.com';
function callApi(endpoind, method, body) {
    const url = API_URL + endpoind;
    const options = {
        method,
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
    return fetch(url, options)
        .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to load')))
        .catch(error => {
        throw error;
    });
}
exports.callApi = callApi;
//# sourceMappingURL=apiHelper.js.map