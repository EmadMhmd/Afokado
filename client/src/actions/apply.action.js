import {APPLY ,APPLICATION_UPDATED , APPLICATION_DELETED ,APPLICATIONS_FETCHING_SUCCESS , APPLICATION_REJECTED ,APPLICATION_ACCEPTED } from './actionTypes';
import {addError ,clearError} from './error.action';
import {addMessage ,clearMessage} from './message.action';
import {fetchingFailed ,fetchingTime} from './fetch.action'
import {apiApply , apiFetchApplications ,apiDeleteApplication ,apiFetchApplicationRequests,apiUpdateApplication  , apiAcceptApplication ,apiRejectApplication} from '../api/apply.api.js';
import {openAppNotifications ,openStudentNotifications} from './notify.action'


export const apply=(id)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message}}=await apiApply(id)
            dispatch({type:APPLY})
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const fetchApplications=()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            dispatch(openStudentNotifications())
            const {data:{applications}}=await apiFetchApplications()
            dispatch({type:APPLICATIONS_FETCHING_SUCCESS , payload:applications})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}


export const deleteApplication=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
           const {data:{message}} =await apiDeleteApplication(id)
           dispatch({type:APPLICATION_DELETED})
           dispatch(fetchApplications())
           dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const rejectApplication=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
           const {data:message}=await apiRejectApplication(id)
           dispatch({type:APPLICATION_REJECTED})
           dispatch(fetchApplicationRequests())
           dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const acceptApplication=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
           const {data:{message}}=await apiAcceptApplication(id)
           dispatch({type:APPLICATION_ACCEPTED})
           dispatch(fetchApplicationRequests())
           dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const updateApplication=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
           const {data:{message}}=await apiUpdateApplication(id)
           dispatch({type:APPLICATION_UPDATED})
           dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const fetchApplicationRequests =()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            dispatch(openAppNotifications())
            const {data:{applications}}=await apiFetchApplicationRequests()
            dispatch({type:APPLICATIONS_FETCHING_SUCCESS , payload:applications})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
