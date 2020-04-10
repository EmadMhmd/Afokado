import {ADD_ERROR  ,CLEAR_ERROR} from '../actions/actionTypes';

const initState={
    err: null
}


export default (state=initState , action)=>{
    switch(action.type){
        case ADD_ERROR:
            return {...state , err : action.payload};
        case CLEAR_ERROR:
            return initState
        default:
            return state;
    }
}