import {INETRNSHIP_ADDED ,INTERNSHIPS_FETCHING_SUCCESS  ,INETRNSHIP_UPDATED ,INETRNSHIP_DELETED } from '../actions/actionTypes';
import {addError ,clearError} from './error.action';
import {fetchingTime , fetchingFailed} from './fetch.action';
import {apiAddInternship ,apiFetchInternships , apiUpdateInternship ,apiDeleteInternship } from '../api/internship.api';

export const addInternship= intern =>{
return async dispatch=>{
    try{
        dispatch(clearError())
        await  apiAddInternship(intern);
        dispatch({type : INETRNSHIP_ADDED})
        dispatch(fetchInternships())
    }catch(e){
        dispatch(addError(e))
    }
}
}

export const updateInternship= intern =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            await apiUpdateInternship(intern);
            dispatch({type : INETRNSHIP_UPDATED})
            dispatch(fetchInternships())
        }catch(e){
            dispatch(addError(e))
        }
    }
    }

export const deleteInternship= id =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            await  apiDeleteInternship(id);
            dispatch({type:INETRNSHIP_DELETED})
            dispatch(fetchInternships())
        }catch(e){
            dispatch(addError(e))
        }
    }
    }

export const fetchInternships= () =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            const {data} =await apiFetchInternships();
            dispatch({type:INTERNSHIPS_FETCHING_SUCCESS , payload:data.internships})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
    }