import {BOOKED ,BOOKS_FETCHING_SUCCESS,BOOK_DELETED ,BOOK_UPDATED} from '../actions/actionTypes';

const initState={
    books:[],
    booked:false,
    deleted:false,
    updated:false
}

export default (state=initState ,action)=>{
    switch(action.type){
        case BOOKS_FETCHING_SUCCESS:
            return{...state ,books:action.payload};
        case BOOKED:
            return{...state ,booked:true};
        case BOOK_DELETED:
            return{...state ,deleted:true};
        case BOOK_UPDATED:
            return{...state ,updated:true};
        default:
            return state;
    }
}