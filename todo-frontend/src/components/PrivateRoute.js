import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/Auth';

const PrivateRoute = ({ element }) => {
  const { token } = useAuth();

  if (!token) {
    // no token --> login
    return <Navigate to="/login" />;
  }

  return element; 
};

export default PrivateRoute;

