import {ADD_MESSAGE ,CLEAR_MESSAGE} from '../actions/actionTypes';
/*
export const addMessage=(m)=>{
    return {type:ADD_MESSAGE , payload :m}
}
export const clearMessage=()=>{
    return {type:CLEAR_MESSAGE}
}*/

const initState={
    message:null,
    messageExist:false
}

export default (state=initState ,action)=>{
    switch(action.type){
        case ADD_MESSAGE :
            return {...state ,messageExist:true , message :action.payload}
        case CLEAR_MESSAGE :
            return initState
        default:
        return state;
    }
}