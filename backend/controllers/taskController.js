const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    const { title, priority, dueDate } = req.body;
    try {
        const task = new Task({
            user: req.user.id,
            title,
            priority,
            dueDate
        });
        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    const { title, isCompleted, priority, dueDate } = req.body;
    try {
        let task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.isCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;

        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();

        res.json({ message: 'Task removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
