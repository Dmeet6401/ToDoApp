// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/Auth'; // Auth context provider
import TodoList from './components/TodoList'; // Your Todo List page
import Login from './components/Login'; // Login page
import Register from './components/Register'; // Register page
import LogoutButton from './components/LogoutButton'; // Logout button component
import PrivateRoute from './components/PrivateRoute'; // Private route component

const App = () => {
  return (
    <Router>  {/* Wrap everything in Router */}
      <AuthProvider>  {/* Wrap AuthProvider inside Router */}
        <Navigation />
        
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/todos" 
            element={<PrivateRoute element={<TodoList />} />} 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

// Navigation component
const Navigation = () => {
  const { token, logout } = useAuth();

  return (
    <nav>
      {token ? (
        <>
          <Link to="/todos">Todo List</Link> | <LogoutButton />
        </>
      ) : (
        <>
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default App;