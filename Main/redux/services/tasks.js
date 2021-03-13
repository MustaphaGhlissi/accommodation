import {
    apiInstance
}  from './index';

function getTasks() {
    return apiInstance.get('/flat-examination-tasks');
}

function patchTask(id, data) {
    return apiInstance.patch(`/flat-examination-tasks/${id}`, data);
}

export {
    getTasks,
    patchTask
}