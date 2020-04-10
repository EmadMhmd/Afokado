import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';
import {onLoadingSignIn} from './actions/auth.actions';

//you have store itself , so you don't need connect()
store.dispatch(onLoadingSignIn());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));


serviceWorker.unregister();
