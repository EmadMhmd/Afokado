import {BOOKED ,BOOKS_FETCHING_SUCCESS , BOOK_UPDATED ,BOOK_DELETED } from './actionTypes';
import {addError ,clearError} from './error.action';
import {fetchingFailed ,fetchingTime} from './fetch.action'
import {apiFetchBooks ,apiDeleteBook ,apiFetchBookRequests,apiUpdateBook } from '../api/book.api.js';
import {openLawyerNotifications} from './notify.action'

export const fetchBooks=()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
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
           await apiDeleteBook(id)
           dispatch({type:BOOK_DELETED})
           dispatch(fetchBooks())
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const updateBook=id=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
           await apiUpdateBook(id)
           dispatch({type:BOOK_UPDATED})
        }catch(e){
            dispatch(addError(e))
        }
    }
}

export const fetchBookRequests =()=>{
    return async dispatch =>{
        try{
            dispatch(clearError())
            dispatch(fetchingTime())
            dispatch(openLawyerNotifications("book"))
            const {data:{books}}=await apiFetchBookRequests()
            dispatch({type:BOOKS_FETCHING_SUCCESS , payload:books})
            
            dispatch(fetchingFailed())
        }catch(e){
            dispatch(fetchingFailed())
            dispatch(addError(e))
        }
    }
}
