// routes/tasks.js
const express = require('express');
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a new task (protected)
router.post('/', authMiddleware, createTask);

// Route to get all tasks for the logged-in user (protected)
router.get('/', authMiddleware, getTasks);

// Route to update a specific task by ID (protected)
router.put('/:id', authMiddleware, updateTask);

// Route to delete a specific task by ID (protected)
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
