import { TASK_DELETED, TASK_UPDATED, TASKS_FETCHING_SUCCESS, TASK_ADDED } from './actionTypes';
import {addError ,clearError} from './error.action';
import {addMessage ,clearMessage} from './message.action';
import {fetchingTime , fetchingFailed} from './fetch.action';
import {apiAddTask ,apiDeleteTask ,apiUpdateTask ,apiFetchTasks , apiFetchTasksForCase , apiFetchTaskRequests} from '../api/task.api.js';
import {openStudentTaskNotifications} from './notify.action';
import {getOffice} from './office.action';



export const addTask=(task)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message}}=await apiAddTask(task);
            dispatch({type:TASK_ADDED})
            dispatch(fetchTasks({dateline:'em' , subLawyer:'em'}))
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const deleteTask=(task_id)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message}}=await apiDeleteTask(task_id);
            dispatch({type:TASK_DELETED})
            dispatch(fetchTasks({dateline:'em' , subLawyer:'em'}))
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const updateTask=(task)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message}}=await apiUpdateTask(task);
            dispatch({type:TASK_UPDATED})
            dispatch(fetchTasks({dateline:'em' , subLawyer:'em'}))
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const fetchTasks=(query)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            dispatch(getOffice())
            const {data:{tasks}}= await apiFetchTasks(query);
            dispatch({type:TASKS_FETCHING_SUCCESS ,payload:tasks})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed(e))
            dispatch(addError(e))
        }
    }
}
export const fetchTaskRequsts=()=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            //dispatch(openStudentTaskNotifications())
            const {data:{tasks}}= await apiFetchTaskRequests();
            dispatch({type:TASKS_FETCHING_SUCCESS ,payload:tasks})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed(e))
            dispatch(addError(e))
        }
    }
}
export const fetchTasksForCase=(id)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            const {data:{tasks}}= await apiFetchTasksForCase(id);
            dispatch({type:TASKS_FETCHING_SUCCESS , payload:tasks})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed(e))
            dispatch(addError(e))
        }
    }
}