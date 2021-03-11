import {
    HANDLE_LOADING,
    HANDLE_REFRESHING,
    HANDLE_INPUT_TEXT,
    HANDLE_RADIO,
    CHECK_DOWNLOAD,
    FETCH_EXAMINATIONS_SUCCESS,
    FETCH_TASKS_SUCCESS,
    DOWNLOAD_EXAMINATIONS_SUCCESS,
    TOGGLE_DIALOG,
    FILL_FORM

} from './actionTypes';

import {
    getExaminations
} from '../services/examinations';

import {
    getTasks
} from '../services/tasks';

import { 
    storeExaminations, readExaminations,
    storeItem, readItem, removeStorage
} from '../../storage';
import { Alert } from 'react-native';
import { SETTINGS_FORM } from '../../constants/forms';


export function handleLoading(bool) {
    return {
        type: HANDLE_LOADING,
        payload: bool
    }
}

export function handleRefreshing(bool) {
    return {
        type: HANDLE_REFRESHING,
        payload: bool
    }
}

export function toggleDialog() {
    return {
        type: TOGGLE_DIALOG,
    }
}

export function handleTextInput(formName, input, value) {
    return {
        type: HANDLE_INPUT_TEXT,
        payload: {
            formName, 
            data: {
                [input]: value
            }
        }
    }
}

export function handleRadio(formName, radio, value) {
    return {
        type: HANDLE_RADIO,
        payload: {
            formName, 
            data: {
                [radio]: value
            }
        }
    }
}

export function onCheckDownload(download) {
    return {
        type: CHECK_DOWNLOAD,
        payload: download
    }
}

export function downloadExaminationsSuccess(data) {
    return {
        type: DOWNLOAD_EXAMINATIONS_SUCCESS,
        payload: data
    }
}

export function downloadExaminations(refreshMode) {
    
    return (dispatch) => {

        if(refreshMode) {
            dispatch(handleRefreshing(true));
        }
        else {
            dispatch(handleLoading(true));
        }
        
        Promise.all([getExaminations(), getTasks()])
            .then(function (results) {
                const data = {};
                data.examinations = results[0].data;
                data.tasks = results[1].data;
                dispatch(downloadExaminationsSuccess(data))
            }).catch(function (error) {
                console.log(error);
            })
            .then(function () {
                if(refreshMode) {
                    dispatch(handleRefreshing(false));
                }
                else {
                    dispatch(handleLoading(false));
                }
            });
    }
}

export function saveDownloads(navigation, examinations) {
    return (dispatch, getState) => {

        const state = getState().main,
            {tasks} = state.downloads;
        let checkedTasks = [];


        for (const examination of examinations) {
            for (const task of tasks) {
                if(task.flatExaminationId === examination.id) {
                    checkedTasks.push(task);
                }
            }
        }

        storeExaminations(examinations, checkedTasks).then(() => {
            Alert.alert('Info', 'Data saved successfully.');
            navigation.goBack();
            fetchExaminations(true);
        });
    }
}

export function fetchExaminationsSuccess(data) {
    return {
        type: FETCH_EXAMINATIONS_SUCCESS,
        payload: data
    }
}

export function fetchExaminations(isRefreshing) {
    return (dispatch) => {
        
        if(isRefreshing) {
            dispatch(handleRefreshing(true));
        }
        else {
            dispatch(handleLoading(true));
        }

        readExaminations().then(values => {
            let examinations = values[0];
            
            if(examinations[1]) {
                examinations = JSON.parse(examinations[1]);
                dispatch(fetchExaminationsSuccess(examinations));
            }  

        }).catch(function(error) {
            
            console.log(error);

        }).then(function() {
            if(isRefreshing) {
                dispatch(handleRefreshing(false));
            }
            else {
                dispatch(handleLoading(false));
            }
        })
    }
}


export function fetchTasksSuccess(data) {
    return {
        type: FETCH_TASKS_SUCCESS,
        payload: data
    }
}

export function fetchTasks(examinationId, isRefreshing) {
    return (dispatch) => {
        
        if(isRefreshing) {
            dispatch(handleRefreshing(true));
        }
        else {
            dispatch(handleLoading(true));
        }

        readExaminations().then(values => {
            let tasks = values[1];
            
            if(tasks[1]) {
                tasks = JSON.parse(tasks[1]);
                tasks = tasks.filter(task => task.flatExaminationId === examinationId)
                dispatch(fetchTasksSuccess(tasks));
            }  

        }).catch(function(error) {
            
            console.log(error);

        }).then(function() {
            if(isRefreshing) {
                dispatch(handleRefreshing(false));
            }
            else {
                dispatch(handleLoading(false));
            }
        })
    }
}

export function saveIpAddress(navigation, ipAddress) {
    return (dispatch, getState) => {

        let state = getState().main, form = state[SETTINGS_FORM];

        storeItem('@accommodation_ip', form.ipAddress).then(() => {
            Alert.alert('Info', 'Ip address saved successfully.');
            navigation.popToTop();
        });
    }
}

export function readIpAddress() {
    return (dispatch, getState) => {
        readItem('@accommodation_ip').then((value) => {
            if(value) {
                dispatch(fillForm(SETTINGS_FORM, {
                    ipAddress: value
                }))
            }
        });
    }
}

export function fillForm(formName, data) {
    return {
        type: FILL_FORM,
        payload: {
            [formName]: data
        }
    }
}