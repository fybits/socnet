import React from 'react';
import { BrowserRouter, Switch as RouterSwitch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import AuthRoute from './components/AuthRoute';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <RouterSwitch>
        <Redirect exact from="/" to="/home"/>
        <AuthRoute path="/home">
          <MainPage />
        </AuthRoute>
        <AuthRoute path="/profile/:id?">
          profile
        </AuthRoute>
        <AuthRoute unauthOnly path="/login">
          <LoginPage />
        </AuthRoute>
        <AuthRoute unauthOnly path="/signup">
          <SignupPage />
        </AuthRoute>
      </RouterSwitch>
    </BrowserRouter>
  );
}

export default App;
