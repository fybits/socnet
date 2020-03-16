import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';
import { LOAD_SESSION } from './app/actions'

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


window.onunload = () => {
  document.cookie = store.getState().authToken;
}

console.log(document.cookie)
store.dispatch({ type: LOAD_SESSION, payload: { authToken: document.cookie } })