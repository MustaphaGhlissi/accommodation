import { FINISH_FORM, TASK_FORM } from '../../constants/forms';
import { 
    HANDLE_REFRESHING,
    HANDLE_LOADING,
    HANDLE_INPUT_TEXT,
    HANDLE_RADIO,
    CHECK_FLAT_EXAMINATION,
    UNCHECK_FLAT_EXAMINATION,
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
    checkedFlatExaminations: []
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

        case CHECK_FLAT_EXAMINATION: 
            return {
                ...state,
                checkedFlatExaminations: [
                    ...state.checkedFlatExaminations,
                    payload
                ]
            }

        case UNCHECK_FLAT_EXAMINATION: 
            let checked = state.checkedFlatExaminations.filter(item => payload.id !== item.id)
            return {
                ...state,
                checkedFlatExaminations: checked
            }

        default: 
            return state;
    }
}