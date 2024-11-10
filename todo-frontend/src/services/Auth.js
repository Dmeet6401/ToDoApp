// src/services/Auth.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);  // Load token from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // If token is updated in the context, save it to localStorage
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');  // Remove token if logged out
    }
  }, [token]);

  const logout = () => {
    setToken(null);  // Remove token from context
    localStorage.removeItem('token');  // Clear token from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
