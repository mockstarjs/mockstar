import { CALL_API } from '../../../../middlewares/api';
import { getCGIBase } from '../../../../custom';

export const MOCKER_REQUEST = 'MOCKER_REQUEST';
export const MOCKER_REQUEST_SUCCESS = 'MOCKER_REQUEST_SUCCESS';
export const MOCKER_REQUEST_FAIL = 'MOCKER_REQUEST_FAIL';

export const MOCKER_README_REQUEST = 'MOCKER_README_REQUEST';
export const MOCKER_README_REQUEST_SUCCESS = 'MOCKER_README_REQUEST_SUCCESS';
export const MOCKER_README_REQUEST_FAIL = 'MOCKER_README_REQUEST_FAIL';

export const SET_ACTIVE_MODULE_REQUEST = 'SET_ACTIVE_MODULE_REQUEST';
export const SET_ACTIVE_MODULE_REQUEST_SUCCESS = 'SET_ACTIVE_MODULE_REQUEST_SUCCESS';
export const SET_ACTIVE_MODULE_REQUEST_FAIL = 'SET_ACTIVE_MODULE_REQUEST_FAIL';

function fetchMocker(mockerName, namespace) {
    return {
        [CALL_API]: {
            types: [MOCKER_REQUEST, MOCKER_REQUEST_SUCCESS, MOCKER_REQUEST_FAIL],
            url: `${getCGIBase()}/mocker/${namespace}/${mockerName}`
        }
    };
}

export function loadMocker(mockerName, namespace) {
    return (dispatch, getState) => {
        return dispatch(fetchMocker(mockerName, namespace));
    };
}

function fetchMockerReadme(mockerName, namespace) {
    return {
        [CALL_API]: {
            types: [MOCKER_README_REQUEST, MOCKER_README_REQUEST_SUCCESS, MOCKER_README_REQUEST_FAIL],
            url: `${getCGIBase()}/mocker/${namespace}/${mockerName}/readme`
        }
    };
}

export function loadMockerReadme(mockerName, namespace) {
    return (dispatch, getState) => {
        return dispatch(fetchMockerReadme(mockerName, namespace));
    };
}

function requestUpdateMocker(mockerName, newMockerState, namespace) {
    return {
        [CALL_API]: {
            types: [SET_ACTIVE_MODULE_REQUEST, SET_ACTIVE_MODULE_REQUEST_SUCCESS, SET_ACTIVE_MODULE_REQUEST_FAIL],
            url: `${getCGIBase()}/mocker/${namespace}/${mockerName}`,
            type: 'POST',
            data: newMockerState
        }
    };
}

export function setMockerActiveModule(mockerName, mockModuleName, namespace) {
    return (dispatch, getState) => {
        return dispatch(requestUpdateMocker(mockerName, {
            config: {
                activeModule: mockModuleName
            }
        }, namespace));
    };
}

export function setMockerDisable(mockerName, value, namespace) {
    return (dispatch, getState) => {
        return dispatch(requestUpdateMocker(mockerName, {
            config: {
                disable: value
            }
        }, namespace));
    };
}