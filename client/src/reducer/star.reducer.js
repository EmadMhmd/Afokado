import {RATEING_GETTING_SUCCESS  } from '../actions/actionTypes';

const initState ={
    stars:0
}

export default (state=initState ,action)=>{
switch(action.type){
    case RATEING_GETTING_SUCCESS:
        return{...state , stars:action.payload}
    default:
        return state
}
}