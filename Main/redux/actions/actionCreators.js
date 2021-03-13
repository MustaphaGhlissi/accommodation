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
    FILL_FORM,
    FILL_PARAM,
    HANDLE_DOWNLOAD,
    HANDLE_UPLOAD
} from './actionTypes';

import {
    getExaminations,
    patchExamination
} from '../services/examinations';

import {
    getTasks,
    patchTask
} from '../services/tasks';

import { 
    storeExaminations, readExaminations,
    storeItem, readItem, removeStorage
} from '../../storage';
import { Alert } from 'react-native';
import { FINISH_FORM, SETTINGS_FORM, TASK_FORM } from '../../constants/forms';





export function handleUploading(bool) {
    return {
        type: HANDLE_UPLOAD,
        payload: bool
    }
}

export function handleDownloading(bool) {
    return {
        type: HANDLE_DOWNLOAD,
        payload: bool
    }
}

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
        let checkedTasks = [], patchs = [];

        dispatch(handleDownloading(true));

        for (const examination of examinations) {
            for (const task of tasks) {
                if(task.flatExaminationId === examination.id) {
                    checkedTasks.push(task);
                }
            }
            patchs.push(patchExamination(examination.id, {state: 265}));
        }

        Promise.all(patchs)
            .then(function (results) {
                console.log(results);
                storeExaminations(examinations, checkedTasks).then(() => {
                    Alert.alert('Info', 'Data saved successfully.');
                    navigation.goBack();
                    fetchExaminations(true);
                });
            }).catch(function (error) {
                console.log(error);
            })
            .then(function () {
                dispatch(handleDownloading(false));
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

export function updateExamination(navigation, examinationId) {
    return (dispatch, getState) => {
        let state = getState().main, form = state[FINISH_FORM],
            {examinations} = state,
            {remark} = form,
            index;

        index = examinations.findIndex(el => el.id === examinationId);
        examinations[index].remark = remark;
        examinations[index].state = 266;

        storeItem('@examinations', JSON.stringify(examinations)).then(() => {
            Alert.alert('Info', 'Data saved successfully.');
            navigation.goBack();
            dispatch(fetchExaminations(true));
        });
    }
}

export function fetchTasksSuccess(tasks, examinationTasks) {
    return {
        type: FETCH_TASKS_SUCCESS,
        payload: {
            tasks,
            examinationTasks
        }
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
            let examinationTasks, tasks = values[1];
            
            if(tasks[1]) {
                tasks = JSON.parse(tasks[1]);
                examinationTasks = tasks.filter(task => task.flatExaminationId === examinationId)
                dispatch(fetchTasksSuccess(tasks, examinationTasks));
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

export function updateTask(navigation, task) {
    return (dispatch, getState) => {
        let state = getState().main, form = state[TASK_FORM],
            {tasks} = state,
            {remark, result} = form,
            index;

        task.remark = remark;
        task.result = result;
        index = tasks.findIndex(el => el.id === task.id);

        tasks[index] = task;

        storeItem('@tasks', JSON.stringify(tasks)).then(() => {
            Alert.alert('Info', 'Data saved successfully.');
            navigation.goBack();
            dispatch(fetchTasks(task.flatExaminationId));
        });
    }
}

export function upload() {
    return (dispatch, getState) => {
        let state = getState().main,
            {examinations, tasks} = state, 
            patchs = [], upExaminations, filteredTasks;

            dispatch(handleUploading(true));

            upExaminations = examinations.filter(el => el.state === 266);
            examinations = examinations.filter(el => el.state !== 266);
            
            for (const examination of upExaminations) {
                patchs.push(patchExamination(examination.id, examination));
                
                filteredTasks = tasks.filter(el => el.flatExaminationId === examination.id);
                tasks = tasks.filter(el => el.flatExaminationId !== examination.id);
                
                for (const task of filteredTasks) {
                    patchs.push(patchTask(task.id, task))
                }
            }    
            
            Promise
                .all(patchs)
                .then(function (results) {
                    storeExaminations(examinations, tasks).then(() => {
                        Alert.alert('Info', 'Data saved successfully.');
                        navigation.goBack();
                        fetchExaminations(true);
                    });
                }).catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    dispatch(handleUploading(false));
                });
    }
}

export function saveIpAddress(navigation, ipAddress) {
    return (dispatch, getState) => {

        let state = getState().main, form = state[SETTINGS_FORM], {storedIpAddress} = state;

        if(storedIpAddress !== form.ipAddress) {
            storeItem('@accommodation_ip', form.ipAddress).then(() => {
                Alert.alert('Info', 'Ip address saved successfully.');
                navigation.popToTop();
            });
        }
        else {
            navigation.popToTop();
        }
    }
}

export function readIpAddress() {
    return (dispatch, getState) => {
        readItem('@accommodation_ip').then((value) => {
            if(value) {
                dispatch(fillForm(SETTINGS_FORM, {
                    ipAddress: value
                }))
                dispatch(fillParam({
                    storedIpAddress: value
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

export function fillParam(data) {
    return {
        type: FILL_PARAM,
        payload: data
    }
}