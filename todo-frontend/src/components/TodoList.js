import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useAuth } from '../services/Auth';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const { token } = useAuth(); 

  // Fetch todos 
  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://todolist3-mhahxeq8.b4a.run/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data); // Update the todos state with the fetched tasks
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTodos(); // Fetch todos when the component mounts and when the token changes
    }
  }, [token]);

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  const updateTodoStatus = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
    );
  };

  const updateTodo = (todo) => {
    setEditingTodo(todo); // Set editingTodo to the task that is being edited
  };

  return (
    <div className="container">
      <h2>Todo List</h2>
      {editingTodo ? (
        <TodoForm
          addTodo={addTodo}
          editTodo={editingTodo}
          setEditingTodo={setEditingTodo}
        />
      ) : (
        <TodoForm addTodo={addTodo} />
      )}
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodoStatus={updateTodoStatus}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
