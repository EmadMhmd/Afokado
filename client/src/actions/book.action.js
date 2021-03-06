import {BOOKED ,BOOKS_FETCHING_SUCCESS , BOOK_UPDATED ,BOOK_DELETED } from './actionTypes';
import {addError ,clearError} from './error.action';
import {addMessage ,clearMessage} from './message.action';
import {fetchingFailed ,fetchingTime} from './fetch.action'
import {apiFetchBooks ,apiDeleteBook ,apiFetchBookRequests,apiUpdateBook , apiBook} from '../api/book.api.js';
import {openBookNotifications} from './notify.action';
import {login ,sign} from './auth.actions';


export const bookWithLogin=(user , id)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
              dispatch(login(user)).then(()=>dispatch(book(id)))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const bookWithSign=(user , id)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
             dispatch(sign(user)).then(()=>dispatch(bookWithLogin(user , id)))
             
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const book=(id)=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            const {data:{message }}=await apiBook(id)
            dispatch({type:BOOKED})
            dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}
export const fetchBooks=()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            const {data:{books}}=await apiFetchBooks()
            dispatch({type:BOOKS_FETCHING_SUCCESS , payload:books})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}


export const deleteBook=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
           const {data:{message}}=await apiDeleteBook(id)
           dispatch({type:BOOK_DELETED})
           dispatch(fetchBooks())
           dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}


export const updateBook=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
           const {data:{message}}=await apiUpdateBook(id)
           dispatch({type:BOOK_UPDATED})
           dispatch(fetchBooks())
           dispatch(addMessage(message))
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const fetchBookRequests =()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(clearMessage())
            dispatch(fetchingTime())
            dispatch(openBookNotifications())
            const {data:{books}}=await apiFetchBookRequests()
            dispatch({type:BOOKS_FETCHING_SUCCESS , payload:books})
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}



