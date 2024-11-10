import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../services/Auth';

const TodoForm = ({ addTodo, editTodo, setEditingTodo }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const { token } = useAuth();

  // Set form fields if we are editing an existing todo
  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setPriority(editTodo.priority);
      setDueDate(editTodo.dueDate);
    }
  }, [editTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { title, priority, dueDate };

    try {
      if (editTodo) {
        // Update existing task
        await axios.put(
          `http://localhost:5000/api/tasks/${editTodo._id}`,
          newTodo,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEditingTodo(null); // Reset editing state after successful update
      } else {
        // Add new task
        const response = await axios.post(
          'http://localhost:5000/api/tasks',
          newTodo,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        addTodo(response.data);
      }

      // Reset form fields
      setTitle('');
      setPriority('medium');
      setDueDate('');
    } catch (err) {
      console.error('Error submitting task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          required
        />
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit">{editTodo ? 'Update Todo' : 'Add Todo'}</button>
    </form>
  );
};

export default TodoForm;