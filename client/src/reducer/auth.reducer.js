import {AUTH_ATTEMPING , AUTH_FAILED , AUTH_SUCCESS , UESR_LOGOUT , PROFILE_GETTING ,USER_ADDED} from '../actions/actionTypes.js';



const initState={
    attempting : false ,
    isAuth : false,
    profile : [],
    added: false
}

const auth_reducer =(state=initState , action)=>{
    switch(action.type){
        case AUTH_ATTEMPING:
            return {...state ,attempting : true , isAuth : false}
        case AUTH_SUCCESS:
            return {...state ,attempting : false , isAuth : true}
        case AUTH_FAILED:
            return {...state ,attempting : false , isAuth : false}
        case UESR_LOGOUT:
            return {...state ,attempting : false , isAuth : false}
        case PROFILE_GETTING:
            return {...state , profile : action.payload}
        case USER_ADDED:
            return {...state , added : true};
        default:
            return state
    }
}



export default  auth_reducer;