import {AUTH_ATTEMPING ,  AUTH_SUCCESS , UESR_LOGOUT , PROFILE_GETTING ,USER_ADDED ,ADD_ERROR } from './actionTypes';
import {addError ,clearError} from './error.action';
import {addMessage ,clearMessage } from './message.action';
import { apiLogin , apiSign ,apiSignForBook ,apiGetProfile } from "../api/auth.api.js";
import setAuthHeadre from '../api/setAuthHeader.js';
import {fetchLawyerNotifications , fetchStudentNotifications} from './notify.action';

const TOKEN_NAME='afokado_app_token'


////////////////////////////////////////////////// {ACTION CREATORS} ///////////////////////////////////////

//action creator , not action
export const login = (request_data) =>{
    return async dispatch =>{
        dispatch({type : AUTH_ATTEMPING }) 
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data : {token , message}} = await apiLogin(request_data)
            setAuthHeadre(token);
            dispatch(getProfile())
            dispatch(success(token))
            dispatch(addMessage(message))
        }catch(e){
            
            dispatch(addError(e))
            
        }
    }
}



//to check if you are looged or not 
export const onLoadingSignIn = ()=>{
    return dispatch =>{
        try{
            dispatch(clearError())
            const token = localStorage.getItem(TOKEN_NAME);
            if(token === null || token === 'undefined'){
                dispatch({type:ADD_ERROR ,payload:'you need to login'})
            }else{
                setAuthHeadre(token)
                dispatch(getProfile())
                
                return dispatch(success(token))
            }
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const getProfile = ()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            const {data : {user}} = await apiGetProfile();
            dispatch({type : PROFILE_GETTING , payload :user});
            if(user.type===2){
                dispatch(fetchLawyerNotifications())
            }
            if(user.type===3){
                dispatch(fetchStudentNotifications())
            }
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const sign=(user)=>{
    return async dispatch=>{
        try{     
            dispatch(clearError()) 
            await apiSign(user)
            dispatch({type:USER_ADDED})
        }catch(e){
            dispatch(addError(e))
        }
    }
}


//////////////////////////////////////// {ACTIONS} ///////////////////////////////////////

//action , not action creator
export const logUserOut =()=>{
    return async dispatch=>{
        dispatch(clearError())
        dispatch(clearMessage())
        localStorage.clear();
        dispatch({ type : UESR_LOGOUT})
    }
}
//action , not action creator
const success = (token)=>{
    localStorage.setItem(TOKEN_NAME,token)
    return {type :AUTH_SUCCESS}
}
