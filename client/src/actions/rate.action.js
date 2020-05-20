import { RATE_ADDED ,RATES_FETCHING_SUCCESS ,RATEING_GETTING_SUCCESS} from './actionTypes.js';
import {addError ,clearError} from './error.action';
import {addMessage ,clearMessage} from './message.action';
import {fetchingTime , fetchingFailed} from './fetch.action';
import {apiAddRate ,apiFetchRates ,apiGetRate} from '../api/rate.api.js';


export const addRate=(rate)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message}}=await apiAddRate(rate);
            dispatch({type:RATE_ADDED})
            dispatch(fetchRates(rate.id))
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const fetchRates=(id)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            const {data:{rates}}=await apiFetchRates(id);
            dispatch({type:RATES_FETCHING_SUCCESS , payload:rates});
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed());
            dispatch(addError(e))
        }
    }
}

export const getRate=(id)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            const {data : {overall}}=await apiGetRate(id)
            dispatch({type:RATEING_GETTING_SUCCESS , payload:overall})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed());
            dispatch(addError(e))
        }
    }
}


