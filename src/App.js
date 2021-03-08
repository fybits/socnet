import React from 'react';
import { BrowserRouter, Switch as RouterSwitch, Redirect, Route } from 'react-router-dom';
import Header from './components/common/Header';
import FeedPage from './components/pages/FeedPage';
import AuthRoute from './components/common/AuthRoute';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import PostPage from './components/pages/PostPage';
import ProfilePage from './components/pages/ProfilePage';
import ErrorPage from './components/pages/ErrorPage';
import Footer from './components/common/Footer';
import { UserContextProvider } from './app/UserContext';

function App() {

  return (
    <BrowserRouter>
    <UserContextProvider>
      <Header />
      <RouterSwitch>
        <Redirect exact from="/" to="/home"/>
        <AuthRoute path="/posts/:id/">
          <PostPage />
        </AuthRoute>
        <AuthRoute path="/profiles/:id?">
          <ProfilePage />
        </AuthRoute>
        <AuthRoute path="/home">
          <FeedPage />
        </AuthRoute>
        <AuthRoute path="/error">
          <ErrorPage />
        </AuthRoute>
        <AuthRoute unauthOnly path="/login">
          <LoginPage />
        </AuthRoute>
        <AuthRoute unauthOnly path="/signup">
          <SignupPage />
        </AuthRoute>
        <Route path="*">
          <ErrorPage error="404 Not Found"/>
        </Route>
      </RouterSwitch>
      <Footer />
    </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
