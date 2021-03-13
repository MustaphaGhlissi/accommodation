import {
    apiInstance
}  from './index';


function getExaminations() {
    return apiInstance.get('/flat-examinations');
}

function patchExamination(id, data) {
    return apiInstance.patch(`/flat-examinations/${id}`, data);
}


export {
    getExaminations,
    patchExamination
}