import {ADD_ERROR ,CLEAR_ERROR} from './actionTypes';

export const addError = e =>{
    const { response: {data :{error}}} = e;            
    return{type:ADD_ERROR, payload: error}
}

export const  clearError = () =>{
    return{type:CLEAR_ERROR}
}