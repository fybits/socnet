import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { baseURL } from './config';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const [authHeader, setAuthHeader] = useState(JSON.parse(localStorage.getItem('authHeader')));

  const signIn = async (formData) => {
    const { status, data, headers } = await axios.post(`${baseURL}/auth/signin`, formData);
    if (status === 200) {
      const newUserData = data.data;
      const newAuthHeader = headers['access-token'];
      setUserData(newUserData);
      setAuthHeader(newAuthHeader);
      localStorage.setItem('userData', JSON.stringify(newUserData));
      localStorage.setItem('authHeader', JSON.stringify(newAuthHeader));
    }
  };

  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authHeader');
    setUserData(null);
    setAuthHeader(null);
    window.location.reload();
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    const header = JSON.parse(localStorage.getItem('authHeader'));
    if (user && header) {
      setUserData(user);
      setAuthHeader(header);
    }
  }, []);

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization = authHeader;
      return config;
    });
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
    }
  }, [authHeader])

  return (
    <UserContext.Provider value={{
      userData,
      setUserData,
      authHeader: authHeader,
      setAuthHeader: setAuthHeader,
      signIn,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  );
};
