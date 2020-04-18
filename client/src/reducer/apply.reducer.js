import {APPLY , APPLICATIONS_FETCHING_SUCCESS ,APPLICATION_DELETED , APPLICATION_UPDATED , APPLICATION_ACCEPTED ,APPLICATION_REJECTED} from '../actions/actionTypes';

const initState={
    applications:[],
    applied:false,
    deleted:false,
    updated:false,
    rejected:false,
    accepted:false
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
        case APPLICATION_ACCEPTED:
            return{...state ,accepted:true};
        case APPLICATION_REJECTED:
            return{...state ,rejected:true};
        default:
            return state;
    }
}