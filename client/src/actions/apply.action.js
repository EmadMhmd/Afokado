import {APPLY ,APPLICATION_UPDATED , APPLICATION_DELETED ,APPLICATIONS_FETCHING_SUCCESS } from './actionTypes';
import {addError ,clearError} from './error.action';
import {fetchingFailed ,fetchingTime} from './fetch.action'
import {apiApply , apiFetchApplications ,apiDeleteApplication ,apiFetchApplicationRequests,apiUpdateApplication } from '../api/apply.api.js';
import {openNotifications} from './notify.action'


export const apply=(id)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            await apiApply(id)
            dispatch({type:APPLY})
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const fetchApplications=()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
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
           await apiDeleteApplication(id)
           dispatch({type:APPLICATION_DELETED})
           dispatch(fetchApplications())
        }catch(e){
            dispatch(addError(e))
        }
    }
}


export const updateApplication=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
           await apiUpdateApplication(id)
           dispatch({type:APPLICATION_UPDATED})
           dispatch(fetchApplications())
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const fetchApplicationRequests =()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            dispatch(openNotifications())
            const {data:{applications}}=await apiFetchApplicationRequests()
            dispatch({type:APPLICATIONS_FETCHING_SUCCESS , payload:applications})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
