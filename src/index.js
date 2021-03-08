import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';

const authHeader = JSON.parse(localStorage.getItem('authHeader'));
if (authHeader) {
  const reqInterceptor = axios.interceptors.request.use((config) => {
    config.headers.Authorization = authHeader;
    return config;
  });
}
axios.interceptors.response.use((response) => response,
(error) => {
  if (error.response.status === 401) {
    window.location.reload();
    localStorage.removeItem('userData');
    localStorage.removeItem('authHeader');
  }
  return Promise.reject(error)
});

ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// window.onunload = () => {
//   window.localStorage.setItem('authHeader', JSON.stringify(store.getState().authHeader));
//   window.localStorage.setItem('userData', JSON.stringify(store.getState().userData));
// }
