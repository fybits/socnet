import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';

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
  window.localStorage.setItem('authHeaders', JSON.stringify(store.getState().authHeaders));
  window.localStorage.setItem('userData', JSON.stringify(store.getState().userData));
  window.localStorage.setItem('posts', JSON.stringify(store.getState().posts.slice(-20)));
}
