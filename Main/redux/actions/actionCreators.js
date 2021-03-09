import {
    HANDLE_LOADING,
    HANDLE_REFRESHING,
    HANDLE_INPUT_TEXT,
    HANDLE_RADIO,
    CHECK_FLAT_EXAMINATION,
    UNCHECK_FLAT_EXAMINATION

} from './actionTypes';


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

export function onCheckFlatExamination(flatExamination) {
    return {
        type: CHECK_FLAT_EXAMINATION,
        payload: flatExamination
    }
}

export function onUnCheckFlatExamination(flatExamination) {
    return {
        type: UNCHECK_FLAT_EXAMINATION,
        payload: flatExamination
    }
}