import {NOTIFICATIONS_OPNED ,NOTIFICATIONS_FETCHING_SUCCESS} from '../actions/actionTypes'
const initState={
    booksCount : 0,
    deletesCount:0,
    countExist:false
}
export default (state=initState ,action)=>{
    switch(action.type){
        case NOTIFICATIONS_FETCHING_SUCCESS:
            return {...state , booksCount:action.booksCount,deletesCount:action.deletesCount, countExist:true}
        case NOTIFICATIONS_OPNED:
            return initState;
        default:
            return state
    }
}