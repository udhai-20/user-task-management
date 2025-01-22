const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, enum: ['Pending', 'Completed', 'Done'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
const TaskModel = mongoose.model('Task', taskSchema);
TaskModel.createIndexes({ taskName: 1 });
TaskModel.createIndexes({ user: 1 });
module.exports = TaskModel;


