import {
    apiInstance
}  from './index';

function getTasks(rootBaseURL) {
    return apiInstance(rootBaseURL).get('/flat-examination-tasks');
}

function patchTask(rootBaseURL, id, data) {
    return apiInstance(rootBaseURL).patch(`/flat-examination-tasks/${id}`, data);
}

export {
    getTasks,
    patchTask
}