import {
    apiInstance
}  from './index';


function getExaminations(rootBaseURL) {
    return apiInstance(rootBaseURL).get('/flat-examinations');
}

function patchExamination(rootBaseURL, id, data) {
    return apiInstance(rootBaseURL).patch(`/flat-examinations/${id}`, data);
}


export {
    getExaminations,
    patchExamination
}