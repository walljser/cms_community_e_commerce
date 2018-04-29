import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import createHistory from 'history/createHashHistory';
import Routes from './Routes';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css';
import './assets/scss/index.scss';

// const history = createHistory()
const loggerMiddleware = createLogger()

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware, // allow us dispatch function
      loggerMiddleware   // use to log  action
    ),
  )
)

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
