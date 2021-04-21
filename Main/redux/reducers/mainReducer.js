import { FINISH_FORM, SETTINGS_FORM, TASK_FORM } from '../../constants/forms';
import { 
    HANDLE_REFRESHING,
    HANDLE_LOADING,
    HANDLE_INPUT_TEXT,
    HANDLE_RADIO,
    DOWNLOAD_EXAMINATIONS_SUCCESS,
    CHECK_DOWNLOAD,
    FETCH_EXAMINATIONS_SUCCESS,
    TOGGLE_DIALOG,
    FILL_FORM,
    FETCH_TASKS_SUCCESS,
    FILL_PARAM,
    HANDLE_DOWNLOAD,
    HANDLE_UPLOAD,
    HANDLE_BOOT,
    HANDLE_UPDATING
} from '../actions/actionTypes';


const initialState = {
    isBooting: true,
    isLoading: false,
    isRefreshing: false,
    isUpdating: false,
    isDownloading: false,
    isUploading: false,
    [TASK_FORM]: {
        result: null,
        remark: null
    },
    [FINISH_FORM]: {
        remark: null
    },
    [SETTINGS_FORM]: {
        ipAddress: null
    },
    storedIpAddress: null,
    downloads: null,
    checkedDownloads: [],
    examinations: null,
    tasks: null,
    photos: null,
    examinationTasks: null,
    isOpenDialog: false
}

export const mainReducer = (state = initialState, action) => {

    let {payload, type} = action;
    
    switch(type) {

        case HANDLE_BOOT:
            return {
                ...state,
                isBooting: payload
            }

        case HANDLE_LOADING:
            return {
                ...state,
                isLoading: payload
            }

        case HANDLE_REFRESHING:
            return {
                ...state,
                isLoading: payload
            }

        case HANDLE_DOWNLOAD:
            return {
                ...state,
                isDownloading: payload
            }

        case HANDLE_UPLOAD:
            return {
                ...state,
                isUploading: payload
            }

        case HANDLE_UPDATING:
            return {
                ...state,
                isUpdating: payload
            }

        case TOGGLE_DIALOG:
            return {
                ...state,
                isOpenDialog: !state.isOpenDialog
            }


        case HANDLE_INPUT_TEXT:
            return {
                ...state,
                [payload.formName]: {
                    ...state[payload.formName],
                    ...payload.data
                }
            }

        case HANDLE_RADIO:
            return {
                ...state,
                [payload.formName]: {
                    ...state[payload.formName],
                    ...payload.data
                }
            }

        case FETCH_EXAMINATIONS_SUCCESS:
            return {
                ...state,
                ...payload
            }

        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                ...payload
            }

        case DOWNLOAD_EXAMINATIONS_SUCCESS:
            return {
                ...state,
                downloads: payload
            }

        case CHECK_DOWNLOAD: 
            
            let checked = state.checkedDownloads;
            let exist = state.checkedDownloads.find(item => payload.id === item.id)
            
            if(exist) {
                checked = checked.filter(item => payload.id !== item.id)
            }
            else {
                checked = [
                    ...checked,
                    payload
                ]
            }
            
            return {
                ...state,
                checkedDownloads: checked
            }

        case FILL_FORM:
            return {
                ...state,
                ...payload
            }

        case FILL_PARAM:
            return {
                ...state,
                ...payload
            }
        
        default: 
            return state;
    }
}