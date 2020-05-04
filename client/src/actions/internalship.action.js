import {INETRNSHIP_ADDED ,INTERNSHIPS_FETCHING_SUCCESS  ,INETRNSHIP_UPDATED ,INETRNSHIP_DELETED } from '../actions/actionTypes';
import {addError ,clearError} from './error.action';
import {addMessage ,clearMessage} from './message.action';

import {fetchingTime , fetchingFailed} from './fetch.action';
import {apiAddInternship ,apiFetchInternshipsForLawyer , apiFetchInternshipsForApply , apiUpdateInternship ,apiDeleteInternship } from '../api/internship.api';

export const addInternship= intern =>{
return async dispatch=>{
    try{
        dispatch(clearError())
        dispatch(clearMessage())
        const {data:{message}}=await  apiAddInternship(intern);
        dispatch({type : INETRNSHIP_ADDED})
        dispatch(fetchInternshipsForLawyer())
        dispatch(addMessage(message))
    }catch(e){
        dispatch(addError(e))
    }
}
}

export const updateInternship= intern =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message}}=await apiUpdateInternship(intern);
            dispatch({type : INETRNSHIP_UPDATED})
            dispatch(fetchInternshipsForLawyer())
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
    }

export const deleteInternship= id =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message}}=await  apiDeleteInternship(id);
            dispatch({type:INETRNSHIP_DELETED})
            dispatch(fetchInternshipsForLawyer())
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
    }

export const fetchInternshipsForLawyer= () =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            const {data:{internships}} =await apiFetchInternshipsForLawyer();
            dispatch({type:INTERNSHIPS_FETCHING_SUCCESS , payload:internships})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
    }
    export const fetchInternshipsForApply= (query) =>{
        return async dispatch=>{
            try{
                dispatch(clearError())
                dispatch(fetchingTime())
                const {data:{internships}} =await apiFetchInternshipsForApply(query);
                dispatch({type:INTERNSHIPS_FETCHING_SUCCESS , payload:internships})
                dispatch(fetchingFailed())
            }catch(e){
                dispatch(fetchingFailed())
                dispatch(addError(e))
            }
        }
        }