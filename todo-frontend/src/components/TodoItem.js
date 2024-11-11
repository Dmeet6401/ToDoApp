import React from 'react';
import axios from 'axios';
import { useAuth } from '../services/Auth';

const TodoItem = ({ todo, deleteTodo, updateTodoStatus, updateTodo }) => {
  const { token } = useAuth(); // Get token from context

  const handleDelete = async () => {
    try {
      await axios.delete(`https://todolist3-mhahxeq8.b4a.run/api/tasks/${todo._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      deleteTodo(todo._id); // Remove todo from the list after successful deletion
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleStatusChange = async (e) => {
    const updatedTodo = { ...todo, isCompleted: e.target.checked };
    try {
      await axios.put(
        `https://todolist3-mhahxeq8.b4a.run/api/tasks/${todo._id}`,
        updatedTodo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      updateTodoStatus(todo._id, updatedTodo);
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const handleEdit = () => {
    updateTodo(todo); // Passing the todo to the update function
  };

  
  const formattedDueDate = new Date(todo.dueDate).toLocaleDateString();

  
  const priorityColor = {
    low: 'green',
    medium: 'orange',
    high: 'red',
  };

  return (
    <li className={todo.isCompleted ? 'done' : ''}>
      <div className="todo-info">
        <input
          type="checkbox"
          checked={todo.isCompleted} // Updated to match the data structure
          onChange={handleStatusChange}
        />
        <h3>{todo.title}</h3>
        <span
          className="priority-dot"
          style={{
            backgroundColor: priorityColor[todo.priority],
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '8px',
          }}
        ></span>
        <span className="due-date">{formattedDueDate}</span>
      </div>
      <div className="button-group">
        <button onClick={handleEdit}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
