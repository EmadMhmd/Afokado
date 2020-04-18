import {BOOK_NOTIFICATIONS_OPNED , APP_NOTIFICATIONS_OPNED ,LAWYER_NOTIFICATIONS_FETCHING_SUCCESS , STUDENT_NOTIFICATIONS_FETCHING_SUCCESS ,STUDENT_NOTIFICATIONS_OPNED} from '../actions/actionTypes'
const initState={
    booksCount : 0,
    BookDeletesCount:0,
    applicationsCount:0,
    AppDeletesCount:0,
    rejectsCount:0,
    acceptsCount:0
}
export default (state=initState ,action)=>{
    switch(action.type){
        case LAWYER_NOTIFICATIONS_FETCHING_SUCCESS:
            return {...state , 
                booksCount:action.booksCount,
                BookDeletesCount:action.BookDeletesCount,
                applicationsCount:action.applicationsCount ,
                AppDeletesCount:action.AppDeletesCount, }
        case STUDENT_NOTIFICATIONS_FETCHING_SUCCESS:
            return {...state , 
                rejectsCount:action.rejectsCount,
                acceptsCount:action.acceptsCount }
        case BOOK_NOTIFICATIONS_OPNED:
            return {...state , booksCount : 0, BookDeletesCount:0};
        case APP_NOTIFICATIONS_OPNED:
                return {...state , applicationsCount:0, AppDeletesCount:0};
        case STUDENT_NOTIFICATIONS_OPNED:
            return {...state , rejectsCount:0, acceptsCount:0};
        default:
            return state
    }
}