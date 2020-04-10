import { NOTIFICATIONS_FETCHING_SUCCESS, NOTIFICATIONS_OPNED } from './actionTypes';
import { apiFetchNotifications, apiOpenNotifications } from '../api/notify.api';
import {fetchingTime ,fetchingFailed} from './fetch.action';
import { addError, clearError } from './error.action';

export const fetchNotifications = () => {
    return async dispatch => {
        try {
            dispatch(fetchingTime())
            dispatch(clearError());
            const {data:{booksCount , deletesCount}}=await apiFetchNotifications()
            dispatch({type:NOTIFICATIONS_FETCHING_SUCCESS , booksCount ,deletesCount})
            dispatch(fetchingFailed())
        } catch (e) {
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}

export const openNotifications = () => {
    return async dispatch => {
        try {
            dispatch(clearError());
            await apiOpenNotifications()
            dispatch({type:NOTIFICATIONS_OPNED})
        } catch (e) {
            dispatch(addError(e))
        }
    }
}