import {NEW_OFFICE_GETTING_SUCCESS ,OFFICE_GETTING_SUCCESS } from '../actions/actionTypes';

const initState={
    added : false,
    office :[],
    newOffice:[]
}


export default (state=initState , action)=>{
    switch(action.type){
        case OFFICE_GETTING_SUCCESS:
            return{...state , office :action.payload};
        case NEW_OFFICE_GETTING_SUCCESS:
            return{...state , newOffice :action.payload};
        default:
            return state;
    }
}
