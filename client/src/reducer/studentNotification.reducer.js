import { STUDENT_NOTIFICATIONS_FETCHING_SUCCESS  , STUDENT_APP_NOTIFICATIONS_OPNED, STUDENT_TASK_NOTIFICATIONS_OPNED } from '../actions/actionTypes'
const initState={
    rejectsCount:0,
    acceptsCount:0,
    tasksCount:0
}
export default (state=initState ,action)=>{
    switch(action.type){
        case STUDENT_NOTIFICATIONS_FETCHING_SUCCESS:
            return {...state , 
                rejectsCount:action.rejectsCount,
                acceptsCount:action.acceptsCount,
                tasksCount:action.tasksCount }
        case STUDENT_APP_NOTIFICATIONS_OPNED:
            return {...state ,rejectsCount:0, acceptsCount:0 };
        case STUDENT_TASK_NOTIFICATIONS_OPNED:
            return {...state , tasksCount:0};
        default:
            return state
    }
}