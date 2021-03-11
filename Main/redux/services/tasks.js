import {
    apiInstance
}  from './index';

function getTasks() {
    return apiInstance.get('/flat-examination-tasks');
}

export {
    getTasks
}