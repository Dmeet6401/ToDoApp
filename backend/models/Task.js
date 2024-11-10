const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    dueDate: { type: Date }
});

module.exports = mongoose.model('Task', taskSchema);
