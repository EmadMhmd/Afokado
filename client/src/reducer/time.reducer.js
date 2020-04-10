import {TIME_ADDED  ,TIME_DELETED ,TIMES_FETCHING_SUCCESS } from '../actions/actionTypes';

const initState={
    added : false,
    times :[],
    updated:false,
    deleted:false
}


export default (state=initState , action)=>{
    switch(action.type){
        case TIME_ADDED:
            return{...state , added : true};
        case TIMES_FETCHING_SUCCESS:
            return{...state , times :action.payload};
        case TIME_DELETED:
            return{...state , deleted : true};
        default:
            return state;
    }
}
