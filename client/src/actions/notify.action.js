import { LAWYER_NOTIFICATIONS_FETCHING_SUCCESS, BOOK_NOTIFICATIONS_OPNED,APP_NOTIFICATIONS_OPNED,
         STUDENT_NOTIFICATIONS_FETCHING_SUCCESS ,STUDENT_TASK_NOTIFICATIONS_OPNED ,STUDENT_APP_NOTIFICATIONS_OPNED
        } from './actionTypes';
import { apiFetchLawyerNotifications, apiFetchStudentNotifications, apiOpenBookNotifications,apiOpenAppNotifications ,apiOpenStudentAppNotifications , apiOpenStudentTaskNotifications} from '../api/notify.api';
import {fetchingTime ,fetchingFailed} from './fetch.action';
import { addError, clearError } from './error.action';

export const fetchLawyerNotifications = () => {
    return async dispatch => {
        try {
            dispatch(fetchingTime())
            dispatch(clearError());
            const {data:{booksCount , BookDeletesCount, applicationsCount ,AppDeletesCount}}=await apiFetchLawyerNotifications()
            dispatch({type:LAWYER_NOTIFICATIONS_FETCHING_SUCCESS , booksCount ,BookDeletesCount , applicationsCount ,AppDeletesCount})
            dispatch(fetchingFailed())
        } catch (e) {
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
export const fetchStudentNotifications = () => {
    return async dispatch => {
        try {
            dispatch(fetchingTime())
            dispatch(clearError());
            const {data:{acceptsCount , rejectsCount , tasksCount}}=await apiFetchStudentNotifications()
            dispatch({type:STUDENT_NOTIFICATIONS_FETCHING_SUCCESS , acceptsCount , rejectsCount , tasksCount})
            dispatch(fetchingFailed())
        } catch (e) {
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
export const openBookNotifications = (type) => {
    return async dispatch => {
        try {
            dispatch(clearError());
            await apiOpenBookNotifications()
            dispatch({type:BOOK_NOTIFICATIONS_OPNED})
        } catch (e) {
            dispatch(addError(e))
        }
    }
}
export const openAppNotifications = () => {
    return async dispatch => {
        try {
            dispatch(clearError());
            await apiOpenAppNotifications()
           dispatch({type:APP_NOTIFICATIONS_OPNED})
        } catch (e) {
            dispatch(addError(e))
        }
    }
}
export const openStudentTaskNotifications = () => {
    return async dispatch => {
        try {
            dispatch(clearError());
            await apiOpenStudentTaskNotifications()
            dispatch({type:STUDENT_TASK_NOTIFICATIONS_OPNED})
        } catch (e) {
            dispatch(addError(e))
        }
    }
}
export const openStudentAppNotifications = () => {
    return async dispatch => {
        try {
            dispatch(clearError());
            await apiOpenStudentAppNotifications()
            dispatch({type:STUDENT_APP_NOTIFICATIONS_OPNED})
        } catch (e) {
            dispatch(addError(e))
        }
    }
}