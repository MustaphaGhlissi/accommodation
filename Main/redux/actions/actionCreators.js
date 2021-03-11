import {
    HANDLE_LOADING,
    HANDLE_REFRESHING,
    HANDLE_INPUT_TEXT,
    HANDLE_RADIO,
    CHECK_DOWNLOAD,
    FETCH_EXAMINATIONS_SUCCESS,
    DOWNLOAD_EXAMINATIONS_SUCCESS,
    TOGGLE_DIALOG

} from './actionTypes';

import {
    getExaminations
} from '../services/examinations';

import {
    getTasks
} from '../services/tasks';

import { storeExaminations, readExaminations } from '../../storage';
import { Alert } from 'react-native';


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

export function saveDownloads(navigation, data) {
    
    return (dispatch) => {
        storeExaminations(data).then(() => {
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
            console.log(values);
            console.log(examinations);
            
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