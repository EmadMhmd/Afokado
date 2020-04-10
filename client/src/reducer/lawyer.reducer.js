import {LAWYERS_FETCHING_SUCCESS , LAWYER_GETTING_SUCCESS } from '../actions/actionTypes';

const initState ={
    lawyers:[],
    lawyer:[]
}

export default (state=initState ,action)=>{
switch(action.type){
    case LAWYERS_FETCHING_SUCCESS:
        return{...state , lawyers:action.payload}
    case LAWYER_GETTING_SUCCESS:
        return{...state , lawyer:action.payload}
    default:
        return state
}
}