import {ADD_MESSAGE ,CLEAR_MESSAGE} from './actionTypes';

export const addMessage = m =>{       
    return{type:ADD_MESSAGE, payload: m}
}

export const  clearMessage = () =>{
    return{type:CLEAR_MESSAGE}
}