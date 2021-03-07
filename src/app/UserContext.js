import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { baseURL } from './config';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [authHeader, setAuthHeader] = useState(null);

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
    const resInterceptor = axios.interceptors.response.use((response) => response,
    (error) => {
      if (error.response.status === 401) {
        window.location.reload();
        localStorage.removeItem('userData');
        localStorage.removeItem('authHeader');
      }
      return Promise.reject(error)
    });
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    }
  }, [authHeader])

  return (
    <UserContext.Provider value={{
      userData,
      setUserData,
      authHeader: authHeader,
      setAuthHeader: setAuthHeader,
      signIn,
    }}>
      {children}
    </UserContext.Provider>
  );
};
