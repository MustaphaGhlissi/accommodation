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
} from '../actions/actionTypes';


const initialState = {
    isLoading: false,
    isRefreshing: false,
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
    downloads: null,
    checkedDownloads: [],
    examinations: null,
    tasks: null,
    isOpenDialog: false
}

export const mainReducer = (state = initialState, action) => {

    let {payload, type} = action;
    
    switch(type) {

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
                examinations: payload,
                checkedDownloads: payload
            }

        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                tasks: payload
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
        
        default: 
            return state;
    }
}