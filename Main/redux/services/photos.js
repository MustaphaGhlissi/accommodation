import {
    apiInstance
}  from './index';

function postPhoto(data) {
    return apiInstance.post(`/flat-examination-task-photos`, data);
}

export {
    postPhoto
}