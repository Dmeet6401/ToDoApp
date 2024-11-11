import axios from 'axios';

const API_BASE_URL = 'https://todolist3-mhahxeq8.b4a.run/api';

// Set token in request headers
const setAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Auth APIs
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    setAuthToken();
    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

export const register = async (email, password) => {
  try {
    await axios.post(`${API_BASE_URL}/auth/register`, { email, password });
    return true;
  } catch (error) {
    console.error("Registration failed:", error);
    return false;
  }
};

// Task APIs
export const getTasks = async () => {
  setAuthToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
};

export const addTask = async (taskData) => {
  setAuthToken();
  try {
    await axios.post(`${API_BASE_URL}/tasks`, taskData);
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};

export const updateTask = async (taskId, updatedData) => {
  setAuthToken();
  try {
    await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedData);
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

export const deleteTask = async (taskId) => {
  setAuthToken();
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};
