import {RATE_ADDED ,RATES_FETCHING_SUCCESS } from '../actions/actionTypes.js';
const initState = {
    added: false,
    rates:[]
}

export default (state=initState ,action)=>{
    switch(action.type){
        case RATE_ADDED :
            return {...state ,added:true} ;
        case RATES_FETCHING_SUCCESS :
            return {...state ,rates:action.payload} ;
        default :
            return state;
    }
}