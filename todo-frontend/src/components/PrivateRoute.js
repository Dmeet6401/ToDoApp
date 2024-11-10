import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/Auth';

const PrivateRoute = ({ element }) => {
  const { token } = useAuth();

  if (!token) {
    // Redirect to login if there's no token
    return <Navigate to="/login" />;
  }

  return element; // If authenticated, render the protected component
};

export default PrivateRoute;

