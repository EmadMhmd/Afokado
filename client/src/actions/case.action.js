import {CASE_ADDED ,CASES_FETCHING_SUCCESS  ,CASE_DELETED ,CASE_UPDATED} from '../actions/actionTypes';
import {addError ,clearError} from './error.action';
import {fetchingTime , fetchingFailed} from './fetch.action';
import {apiAddCase ,apiFetchCases , apiUpdateCase ,apiDeleteCase ,apiArchiveCase} from '../api/case.api'

export const addCase= newCase =>{
return async dispatch=>{
    try{
        dispatch(clearError())
        await  apiAddCase(newCase);
        dispatch({type : CASE_ADDED})
        dispatch(fetchCases())
    }catch(e){
        dispatch(addError(e))
    }
}
}

export const updateCase= newCase =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            await  apiUpdateCase(newCase);
            dispatch({type : CASE_UPDATED})
            dispatch(fetchCases())
        }catch(e){
            dispatch(addError(e))
        }
    }
    }
export const deleteCase= id =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            await  apiDeleteCase(id);
            dispatch({type:CASE_DELETED})
            dispatch(fetchCases())
        }catch(e){
            dispatch(addError(e))
        }
    }
    }
export const archievCase= id =>{
        return async dispatch=>{
            try{
                dispatch(clearError())
                await  apiArchiveCase(id);
                dispatch(fetchCases())
            }catch(e){
                dispatch(addError(e))
            }
        }
        }


export const fetchCases= (archive=0) =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            const {data:{cases}} =await apiFetchCases(archive);
            dispatch({type:CASES_FETCHING_SUCCESS , payload:cases})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
    }