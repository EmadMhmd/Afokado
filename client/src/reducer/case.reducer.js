import {CASE_ADDED , CASE_UPDATED , CASE_DELETED ,CASES_FETCHING_SUCCESS,CASE_GETTING_SUCCESS } from '../actions/actionTypes';

const initState={
    added : false,
    cases :[],
    oneCase:[],
    updated:false,
    deleted:false
}


export default (state=initState , action)=>{
    switch(action.type){
        case CASE_ADDED:
            return{...state , added : true};
        case CASES_FETCHING_SUCCESS:
            return{...state , cases :action.payload};
        case CASE_GETTING_SUCCESS:
            return{...state , oneCase :action.payload};
        case CASE_DELETED:
            return{...state , deleted : true};
        case CASE_UPDATED:
            return{...state , updated : true};
        default:
            return state;
    }
}
