import {OFFICE_GETTING_SUCCESS , NEW_OFFICE_GETTING_SUCCESS} from './actionTypes';
import {addError ,clearError} from './error.action';
import {addMessage ,clearMessage} from './message.action';
import {fetchingFailed ,fetchingTime} from './fetch.action'
import {apiAcceptOffice ,apiRejectOffice ,apiOutFromOffice ,apiGetMyOffice ,apiAddToOffice ,apiDeleteFromOffice ,apiGetOffice ,apiGetNewOffice} from '../api/office.api.js';



export const addToOffice=(id)=>{
    return async dispatch=>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message}}=await apiAddToOffice(id)
            dispatch(getOffice())
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const getOffice=()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data:{office}}=await apiGetOffice()
            dispatch({type:OFFICE_GETTING_SUCCESS , payload:office})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
export const getNewOffice=(query)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data:{newOffice}}=await apiGetNewOffice(query)
            dispatch({type:NEW_OFFICE_GETTING_SUCCESS , payload:newOffice})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
export const getMyOffice=()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data:{office}}=await apiGetMyOffice()
            dispatch({type:OFFICE_GETTING_SUCCESS , payload:office})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
export const deleteFromOffice=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
           const {data:{message}} =await apiDeleteFromOffice(id)
           dispatch(getOffice())
           dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const rejectOffice=id=>{
    return async dispatch =>{
        try{
           dispatch(clearError())
           dispatch(clearMessage())
           const {data:{message}}=await apiRejectOffice(id)
           dispatch(getMyOffice())
           dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const acceptOffice=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
           const {data:{message}}=await apiAcceptOffice(id)
           dispatch(getMyOffice())
           dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const outFromOffice=id=>{
    return async dispatch =>{
        try{
           dispatch(clearError())
           dispatch(clearMessage())
           const {data:{message}}=await apiOutFromOffice(id)
           dispatch(getMyOffice())
           dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}

