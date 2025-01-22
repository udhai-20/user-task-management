const TaskDtO = {
    taskName: { type: "string", required: true },
    description: { type: "string", required: true },
    status: { type: "string", required: true, enum: ['Pending', 'Completed', 'Done'] },  // Enum for the three status
};

module.exports = TaskDtO;