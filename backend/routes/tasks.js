const express = require('express');
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// authMiddleware is a middleware that is responsible for user is authenticated
router.post('/', authMiddleware, createTask);

router.get('/', authMiddleware, getTasks);

router.put('/:id', authMiddleware, updateTask);

router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
