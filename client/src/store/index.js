import {createStore , applyMiddleware , compose} from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk';



const middlewares = [thunk]

const storeENhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export default createStore(reducer , {} , storeENhancer(applyMiddleware(...middlewares)));