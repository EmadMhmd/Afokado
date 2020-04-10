import { TASK_DELETED, TASK_UPDATED, TASKS_FETCHING_SUCCESS, TASK_ADDED } from './actionTypes';
import {addError ,clearError} from './error.action';
import {fetchingTime , fetchingFailed} from './fetch.action';
import {apiAddTask ,apiDeleteTask ,apiUpdateTask ,apiFetchTasks} from '../api/task.api.js';


export const addTask=(task)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            await apiAddTask(task);
            dispatch({type:TASK_ADDED})
            dispatch(fetchTasks())
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const deleteTask=(task_id)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            await apiDeleteTask(task_id);
            dispatch({type:TASK_DELETED})
            dispatch(fetchTasks())
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const updateTask=(task)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            await apiUpdateTask(task);
            dispatch({type:TASK_UPDATED})
            dispatch(fetchTasks())
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const fetchTasks=()=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            const {data:{tasks}}= await apiFetchTasks();
            dispatch({type:TASKS_FETCHING_SUCCESS ,payload:tasks})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed(e))
            dispatch(addError(e))
        }
    }
}
