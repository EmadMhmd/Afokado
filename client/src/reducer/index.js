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
import notify from './notify.reducer';
import message from './message.reducer';
import star from './star.reducer';

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
    notify,
    message,
    apply,
    star
})