import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';
import { UserContextProvider } from './app/UserContext';

ReactDOM.render(
  <UserContextProvider>
    <CssBaseline />
    <App />
  </UserContextProvider>,
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
