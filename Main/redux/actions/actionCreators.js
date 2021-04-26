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
    HANDLE_UPLOAD,
    HANDLE_BOOT,
    HANDLE_UPDATING
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
    postPhoto
} from '../services/photos';

import { 
    storeExaminations, readExaminations,
    storeItem, readItem, removeStorage,
    storeMultipleItems,
} from '../../storage';
import { Alert } from 'react-native';
import { FINISH_FORM, SETTINGS_FORM, TASK_FORM } from '../../constants/forms';
import _ from 'lodash';



export function handleBooting(bool) {
    return {
        type: HANDLE_BOOT,
        payload: bool
    }
}

export function boot() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(handleBooting(false))
        }, 2500)
    }
}

export function handleUploading(bool) {
    return {
        type: HANDLE_UPLOAD,
        payload: bool
    }
}

export function handleUpdating(bool) {
    return {
        type: HANDLE_UPDATING,
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
    
    return (dispatch, getState) => {

        const state = getState().main, { storedIpAddress } = state;

        if(refreshMode) {
            dispatch(handleRefreshing(true));
        }
        else {
            dispatch(handleLoading(true));
        }
        
        Promise.all([getExaminations(storedIpAddress), getTasks(storedIpAddress)])
            .then(function (results) {
                const data = {};
                data.examinations = results[0].data;
                data.tasks = results[1].data;
                dispatch(downloadExaminationsSuccess(data))
            }).catch(function (error) {
                console.log(error);
                Alert.alert('Error', 'Please check your IP address in Settings then try again.');
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

export function saveDownloads(navigation, checkedExaminations) {
    return (dispatch, getState) => {

        const state = getState().main,
            {examinations, tasks, storedIpAddress} = state,
            downloadedTasks = state.downloads.tasks;
        let checkedTasks = [], patchs = [];

        if(!storedIpAddress) {
            Alert.alert('Error', 'You should set the API IP address in Settings.');
            return false;
        }

        dispatch(handleDownloading(true));

        for (const examination of checkedExaminations) {
            if(downloadedTasks.length > 0) {
                for (const task of downloadedTasks) {
                    if(task.flatExaminationId === examination.id) {
                        checkedTasks.push(task);
                    }
                }
            }
            patchs.push(patchExamination(storedIpAddress, examination.id, {state: 265}));
        }


            Promise.all(patchs)
                .then(function (results) {
                    storeExaminations([...checkedExaminations, ...examinations], [...checkedTasks, ...tasks])
                    .then(() => {
                        dispatch(fillParam({
                            checkedDownloads: []
                        }))
                        Alert.alert('Info', 'Data saved successfully.');
                        navigation.goBack();
                        fetchExaminations(true);
                    });
                }).catch(function (error) {
                    Alert.alert('Error', 'Please check your IP address in Settings then try again.');
                })
                .then(function () {
                    dispatch(handleDownloading(false));
                });
       
       
    }
}

export function fetchExaminationsSuccess(examinations, tasks, photos) {
    return {
        type: FETCH_EXAMINATIONS_SUCCESS,
        payload: {
            examinations, tasks, photos
        }
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
            let examinations = values[0],
                tasks = values[1],
                ipAddress = values[2],
                photos = values[3];
            
                if(examinations[1]) {
                    examinations = JSON.parse(examinations[1]);
                }
                else {
                    examinations = [];
                }

                if(tasks[1]) {
                    tasks = JSON.parse(tasks[1]);
                }
                else {
                    tasks = [];
                }

                if(photos[1]) {
                    photos = JSON.parse(photos[1]);
                }
                else {
                    photos = [];
                }

            dispatch(fetchExaminationsSuccess(examinations, tasks, photos));

            if(ipAddress[1]) {
                dispatch(fillForm(SETTINGS_FORM, {
                    ipAddress: ipAddress[1]
                }));
                dispatch(fillParam({
                    storedIpAddress: ipAddress[1]
                }));
            }
        }).catch(function(error) {
            
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

export function fetchTasksSuccess(examinationTasks) {
    return {
        type: FETCH_TASKS_SUCCESS,
        payload: {
            examinationTasks
        }
    }
}

export function fetchTasks(examinationId, isRefreshing) {
    return (dispatch, getState) => {

        let state = getState().main, {tasks} = state, examinationTasks;

        if(tasks) {
            examinationTasks = tasks.filter(task => task.flatExaminationId === examinationId)
            dispatch(fetchTasksSuccess(examinationTasks));
        }
    }
}

export function updateTask(navigation, examinationId, task, uploads) {
    return (dispatch, getState) => {
        let state = getState().main, form = state[TASK_FORM],
            {tasks, storedIpAddress, photos} = state,
            {remark, result} = form,
            taskPhotoskey = examinationId + '' + task.id,
            taskPhotosIndex,
            index;


        if(!storedIpAddress) {
            Alert.alert('Error', 'You should set the API IP address in Settings.');
            return false;
        }

        dispatch(handleUpdating(true));

        task.remark = remark;
        task.result = result;
        index = tasks.findIndex(el => el.id === task.id);

        tasks[index] = task;


        if (uploads.data.length > 0) {
            if(photos.length > 0) {
                taskPhotosIndex = photos.findIndex(photo => photo.key === taskPhotoskey);
                photos[taskPhotosIndex] = uploads;
            }
            else {
                photos.push(uploads);
            }
        }

        storeMultipleItems([['@tasks', JSON.stringify(tasks)], ['@photos', JSON.stringify(photos)]]).then(() => {
            dispatch(handleUpdating(false));
            Alert.alert('Info', 'Data saved successfully.');
            console.log(photos);
            dispatch(fillParam({
                photos
            }));
            navigation.goBack();
            dispatch(fetchTasks(task.flatExaminationId));
        });
    }
}

export function upload() {
    return (dispatch, getState) => {
        let store = getState().main,
            {examinations, tasks, photos, storedIpAddress} = store, 
            copyExaminations = [...examinations],
            copyTasks = [...tasks],
            copyPhotos = photos ? [...photos] : null,
            patchs = [], 
            postPhotosRequests = [],
            upExaminations, filteredTasks, filteredTaskPhotos,
            examinationId, taskId;


            if(!storedIpAddress) {
                Alert.alert('Error', 'You should set the API IP address in Settings.');
                return false;
            }

            dispatch(handleUploading(true));

            upExaminations = copyExaminations.filter(el => el.state === 266);
            copyExaminations = copyExaminations.filter(el => el.state !== 266);
            
            for (let examination of upExaminations) {
                examinationId = examination.id;
                delete examination.id;
                patchs.push(patchExamination(storedIpAddress, examinationId, examination));
               
                if(copyTasks.length > 0) {
                    filteredTasks = copyTasks.filter(el => el.flatExaminationId === examinationId);
                    copyTasks = copyTasks.filter(el => el.flatExaminationId !== examinationId);

                    for (let task of filteredTasks) {
                        taskId = task.id;
                        delete task.id;
                        patchs.push(patchTask(storedIpAddress, taskId, task));

                        if(copyPhotos.length > 0) {
                            let photosKey = examinationId + '' + taskId;
                            filteredTaskPhotos = copyPhotos.find((el, index) => photosKey === el.key);
                            copyPhotos = copyPhotos.filter((el, index) => photosKey !== el.key);

                            for (let photoItem of filteredTaskPhotos.data) {
                                postPhotosRequests.push(
                                    postPhoto(storedIpAddress, {
                                        photo: photoItem.photo, 
                                        referenceId: '2021'
                                    })
                                );
                            }
                        }
                    }
                }
            }    

            if(patchs.length > 0) {
                Promise
                    .all([...patchs, ...postPhotosRequests])
                    .then(function (results) {    
                        storeExaminations(copyExaminations, copyTasks, copyPhotos).then(() => {
                            Alert.alert('Info', 'Data transferred successfully.');
                            dispatch(fetchExaminations())
                        });
                    }).catch(function (error) {
                        Alert.alert('Error', 'Please check your IP address in Settings then try again.');
                    })
                    .then(function () {
                        dispatch(handleUploading(false));
                    });
            }
            else {
                Alert.alert('Info', 'No data available for upload.');
                dispatch(handleUploading(false));
            }
    }
}

export function saveIpAddress(navigation) {
    return (dispatch, getState) => {

        let state = getState().main, form = state[SETTINGS_FORM], {storedIpAddress} = state;

        if(storedIpAddress !== form.ipAddress) {
            if(!_.startsWith(storedIpAddress, 'http://') || !_.startsWith(storedIpAddress, 'https://')) {
                Alert.alert('Error', 'IP address is invalid\n\n' +
                    'Make sure to respect this format including http(s) scheme\n\n' + 
                    'Example: http://192.168.1.1');
                return false;
            }
            storeItem('@accommodation_ip', form.ipAddress).then(() => {
                Alert.alert('Info', 'Ip address saved successfully.');
                dispatch(fillParam({
                    storedIpAddress: form.ipAddress
                }))
                navigation.popToTop();
            });
        }
        else {
            navigation.popToTop();
        }
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