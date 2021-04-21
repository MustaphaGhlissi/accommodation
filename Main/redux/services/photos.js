import {
    apiInstance
}  from './index';

function postPhoto(rootBaseURL, data) {
    return apiInstance(rootBaseURL).post(`/flat-examination-task-photos`, data);
}

export {
    postPhoto
}