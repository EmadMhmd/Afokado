import {TIME_ADDED ,TIME_DELETED  , TIMES_FETCHING_SUCCESS } from '../actions/actionTypes';
import {addError ,clearError} from './error.action';
import {addMessage ,clearMessage} from './message.action';
import {fetchingTime , fetchingFailed} from './fetch.action';
import {apiAddTime ,apiDeleteTime  ,apiFetchTimes ,apiOfficeTimes} from '../api/times.api';

export const addTime= time =>{
return async dispatch=>{
    try{
        dispatch(clearError())
        dispatch(clearMessage())
        const {data:{message}}=await  apiAddTime(time);
        dispatch({type : TIME_ADDED})
        dispatch(fetchTimes(time.owner))
        dispatch(addMessage(message))
    }catch(e){
        dispatch(addError(e))
    }
}
}
export const officeTimes= times =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message}}=await  apiOfficeTimes(times);
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
    }
export const deleteTime= time =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message}}=await  apiDeleteTime(time._id);
            dispatch({type:TIME_DELETED})
            dispatch(fetchTimes(time.owner))
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
    }


export const fetchTimes= (id) =>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            const {data} =await apiFetchTimes(id);
            dispatch({type:TIMES_FETCHING_SUCCESS , payload:data.times})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
    }