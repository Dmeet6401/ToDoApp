// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../services/Auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth();  // We need this to set the token in context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://todolist3-mhahxeq8.b4a.run/api/auth/login', {
        username,
        password,
      });

      const { token } = response.data;  // Assume backend sends token in the response

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Update token in Auth context (this will trigger a re-render)
      setToken(token);


      navigate('/todos');  
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials, please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
