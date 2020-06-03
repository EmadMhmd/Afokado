//that for compiling reducers

import {combineReducers} from 'redux';
import auth from  './auth.reducer';
import cases from './case.reducer';
import internship from './internship.reducer';
import time from './time.reducer';
import lawyer from './lawyer.reducer';
import book from './book.reducer';
import rate from './rate.reducer';
import task from './task.reducer';
import apply from './apply.reducer';
import error from './error.reducer';
import fetch from './fetch.reducer';
import message from './message.reducer';
import star from './star.reducer';
import office from './office.reducer';
import stuNotify from './studentNotification.reducer';
import lawNotify from './lawyerNotification.reducer';

export default combineReducers({
    auth,
    cases,
    internship,
    time,
    lawyer,
    book,
    rate,
    task,
    error,
    fetch,
    message,
    apply,
    star,
    office,
    stuNotify,
    lawNotify

})