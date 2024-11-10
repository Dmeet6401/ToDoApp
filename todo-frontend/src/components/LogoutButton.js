// src/components/LogoutButton.js
import React from 'react';
import { useAuth } from '../services/Auth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');  //  after logout go to login
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
