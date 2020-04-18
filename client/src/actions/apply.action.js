import {APPLY ,APPLICATION_UPDATED , APPLICATION_DELETED ,APPLICATIONS_FETCHING_SUCCESS , APPLICATION_REJECTED ,APPLICATION_ACCEPTED } from './actionTypes';
import {addError ,clearError} from './error.action';
import {fetchingFailed ,fetchingTime} from './fetch.action'
import {apiApply , apiFetchApplications ,apiDeleteApplication ,apiFetchApplicationRequests,apiUpdateApplication  , apiAcceptApplication ,apiRejectApplication} from '../api/apply.api.js';
import {openLawyerNotifications ,openStudentNotifications} from './notify.action'


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
            await openStudentNotifications()
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
export const rejectApplication=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
           await apiRejectApplication(id)
           dispatch({type:APPLICATION_REJECTED})
           dispatch(fetchApplicationRequests())
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const acceptApplication=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
           await apiAcceptApplication(id)
           dispatch({type:APPLICATION_ACCEPTED})
           dispatch(fetchApplicationRequests())
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
            dispatch(openLawyerNotifications("app"))
            const {data:{applications}}=await apiFetchApplicationRequests()
            dispatch({type:APPLICATIONS_FETCHING_SUCCESS , payload:applications})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
