import {FETCHING_TIME ,FETCHING_FAILED} from './actionTypes';

export const fetchingTime =() =>{
       
    return{type:FETCHING_TIME}
}

export const  fetchingFailed = ()=>{
    return{type:FETCHING_FAILED}
}