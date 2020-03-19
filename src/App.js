import React from 'react';
import { BrowserRouter, Switch as RouterSwitch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import AuthRoute from './components/AuthRoute';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PostPage from './components/PostPage';
import ProfilePage from './components/ProfilePage';

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <RouterSwitch>
        <Redirect exact from="/" to="/home"/>
        <AuthRoute path="/home">
          <MainPage />
        </AuthRoute>
        <AuthRoute path="/posts/:id/">
          <PostPage />
        </AuthRoute>
        <AuthRoute path="/profiles/:id/">
          <ProfilePage />
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
