/*
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
*/
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers'

import App from './layout/App';

import './index.css';


//const reducer = combineReducers(Object.assign({}, reducers, {}))
/*
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunkMiddleware),
  DevTools.instrument()
)
*/
// add logging for DEV builds only
const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
    //middleware.push(createLogger())
}
// when running in DEV mode we need to point the API address at our service application
// the service application will allow cross origin for http://localhost:3000 to give the DEV app access to data
let store;
if (process.env.NODE_ENV !== 'production') {
    window.API_BASE_ADDRESS = 'http://localhost:8080';
    window.REDUX_DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION__';
    store = createStore(
      reducers,
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    )
} else {
    window.API_BASE_ADDRESS = '';
    window.REDUX_DEVTOOLS = '';
    store = createStore(reducers,applyMiddleware(...middleware))
}

console.log('***********************');
console.log('process.env.NODE_ENV='+process.env.NODE_ENV);
console.log('window.API_BASE_ADDRESS='+window.API_BASE_ADDRESS);
console.log('window.REDUX_DEVTOOLS='+window.REDUX_DEVTOOLS);
console.log('***********************');

// Note: passing enhancer as the last argument requires redux@>=3.1.0
// const store = createStore(reducer, enhancer)

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root'));

registerServiceWorker();
