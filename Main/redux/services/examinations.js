import {
    apiInstance
}  from './index';


function getExaminations() {
    return apiInstance.get('/flat-examinations');
}


export {
    getExaminations
}