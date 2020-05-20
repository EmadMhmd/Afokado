import {LAWYERS_FETCHING_SUCCESS ,LAWYER_GETTING_SUCCESS  ,RATES_FETCHING_SUCCESS ,TIMES_FETCHING_SUCCESS , RATEING_GETTING_SUCCESS } from '../actions/actionTypes';
import {fetchingTime ,fetchingFailed} from './fetch.action';
import {addError ,clearError} from './error.action';
import {apiFetchLawyers , apiGetLawyer} from '../api/lawyer.api';
import {apiFetchRates , apiGetRate} from '../api/rate.api.js';
import {apiFetchTimes} from '../api/times.api.js';

export const fetchLawyers =(query)=>{
  return async dispatch =>{
      try{
          dispatch(clearError())
          dispatch(fetchingTime())
          const {data : {lawyers}}=await apiFetchLawyers(query)
          dispatch({type:LAWYERS_FETCHING_SUCCESS , payload:lawyers})
          dispatch(fetchingFailed())
      }catch(e){
          dispatch(fetchingFailed())
          dispatch(addError(e))
      }
  }
}


export const getLawyer =(id)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            //dispatch({type:INIT_LAWYER})
            const {data : {lawyers}}=await apiGetLawyer(id)
            const {data : {rates}}=await apiFetchRates(id)
            //const {data : {overall}}=await apiGetRate(id)
            const {data : {times}}=await apiFetchTimes(id)
            dispatch({type:LAWYER_GETTING_SUCCESS , payload:lawyers})
            dispatch({type:RATES_FETCHING_SUCCESS , payload:rates})
            //dispatch({type:RATEING_GETTING_SUCCESS , payload:overall})
            dispatch({type:TIMES_FETCHING_SUCCESS , payload:times})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
  }
