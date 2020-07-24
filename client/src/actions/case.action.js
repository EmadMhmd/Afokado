import { CASE_ADDED, CASES_FETCHING_SUCCESS, CASE_DELETED, CASE_UPDATED, CASE_GETTING_SUCCESS ,CASES_OWNER_FETCHING_SUCCESS } from '../actions/actionTypes';
import { addError, clearError } from './error.action';
import { fetchingTime, fetchingFailed } from './fetch.action';
import { apiAddCase, apiFetchCases, apiUpdateCase, apiDeleteCase, apiArchiveCase, apiGetCase ,apiGetNewCaseOwner ,apiFetchUserCases} from '../api/case.api';
import { addMessage, clearMessage } from './message.action';
import { getOffice } from './office.action';

export const addCase = newCase => {
    return async dispatch => {
        try {
            dispatch(clearError())
            dispatch(clearMessage())
            const { data: { message } } = await apiAddCase(newCase);
            dispatch({ type: CASE_ADDED })
            dispatch(fetchCases({ archive: 'em', type: 'em' }))
            dispatch(addMessage(message))
        } catch (e) {
            dispatch(addError(e))
        }
    }
}

export const updateCase = newCase => {
    return async dispatch => {
        try {
            dispatch(clearError())
            dispatch(clearMessage())
            const { data: { message } } = await apiUpdateCase(newCase);
            dispatch({ type: CASE_UPDATED })
            dispatch(fetchCases({ archive: 'em', type: 'em' }))
            dispatch(addMessage(message))
        } catch (e) {
            dispatch(addError(e))
        }
    }
}
export const deleteCase = id => {
    return async dispatch => {
        try {
            dispatch(clearError())
            dispatch(clearMessage())
            const { data: { message } } = await apiDeleteCase(id);
            dispatch({ type: CASE_DELETED })
            dispatch(fetchCases({ archive: 'em', type: 'em' }))
            dispatch(addMessage(message))
        } catch (e) {
            dispatch(addError(e))
        }
    }
}
export const archievCase = id => {
    return async dispatch => {
        try {
            dispatch(clearError())
            dispatch(clearMessage())
            const { data: { message } } = await apiArchiveCase(id);
            dispatch(fetchCases({ archive: 'em', type: 'em' }))
            dispatch(addMessage(message))
        } catch (e) {
            dispatch(addError(e))
        }
    }
}


export const fetchCases = (query) => {
    return async dispatch => {
        try {
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            dispatch(getOffice())
            const { data: { cases } } = await apiFetchCases(query);
            dispatch({ type: CASES_FETCHING_SUCCESS, payload: cases })
            dispatch(fetchingFailed())
        } catch (e) {
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
export const fetchUserCases = () => {
    return async dispatch => {
        try {
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            dispatch(getOffice())
            const { data: { cases } } = await apiFetchUserCases();
            dispatch({ type: CASES_FETCHING_SUCCESS, payload: cases })
            dispatch(fetchingFailed())
        } catch (e) {
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
export const getCase = (id) => {
    return async dispatch => {
        try {
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const { data: { cases } } = await apiGetCase(id);
            dispatch({ type: CASE_GETTING_SUCCESS, payload: cases })
            dispatch(fetchingFailed())
        } catch (e) {
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}

export const getNewCaseOwner = (query) => {
    return async dispatch => {
        try {
            dispatch(clearError())
            dispatch(clearMessage())
            const { data: { owners } } = await apiGetNewCaseOwner(query)
            dispatch({ type: CASES_OWNER_FETCHING_SUCCESS, payload: owners })
            dispatch(fetchingFailed())
        } catch (e) {
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
