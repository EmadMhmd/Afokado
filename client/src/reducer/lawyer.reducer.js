import {LAWYERS_FETCHING_SUCCESS , LAWYER_GETTING_SUCCESS , INIT_LAWYER} from '../actions/actionTypes';

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
    case INIT_LAWYER:
        return initState
    default:
        return state
}
}