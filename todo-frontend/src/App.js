import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/Auth'; 
import TodoList from './components/TodoList'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import LogoutButton from './components/LogoutButton'; 
import PrivateRoute from './components/PrivateRoute'; 

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