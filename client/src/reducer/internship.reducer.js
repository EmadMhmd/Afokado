import {INETRNSHIP_ADDED , INETRNSHIP_UPDATED , INETRNSHIP_DELETED ,INTERNSHIPS_FETCHING_SUCCESS } from '../actions/actionTypes';

const initState={
    added : false,
    internships :[],
    updated:false,
    deleted:false
}


export default (state=initState , action)=>{
    switch(action.type){
        case INETRNSHIP_ADDED:
            return{...state , added : true};
        case INTERNSHIPS_FETCHING_SUCCESS:
            return{...state , fetching:false , internships :action.payload};
        case INETRNSHIP_UPDATED:
            return{...state , updated : true};
        case INETRNSHIP_DELETED:
            return{...state , deleted : true};
        default:
            return state;
    }
}
