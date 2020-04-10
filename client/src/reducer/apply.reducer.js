import {APPLY , APPLICATIONS_FETCHING_SUCCESS ,APPLICATION_DELETED , APPLICATION_UPDATED} from '../actions/actionTypes';

const initState={
    applications:[],
    applied:false,
    deleted:false,
    updated:false
}

export default (state=initState ,action)=>{
    switch(action.type){
        case APPLICATIONS_FETCHING_SUCCESS:
            return{...state ,applications:action.payload};
        case APPLY:
            return{...state ,applied:true};
        case APPLICATION_DELETED:
            return{...state ,deleted:true};
        case APPLICATION_UPDATED:
            return{...state ,updated:true};
        default:
            return state;
    }
}