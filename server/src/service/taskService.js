const TaskModel = require("../model/taskModel");

class TaskService {
    // Create a new task
    async createTask(taskData) {
        try {
            const newTask = new TaskModel(taskData);
            await newTask.save();
            return newTask;
        } catch (err) {
            console.log('err:', err);
            throw new Error('Error creating task');
        }
    }

    // Get all tasks
    async getAllTasks(userId) {
        try {
            const tasks = await TaskModel.find({userId});
            if (!tasks) {
                throw new Error('No tasks found');
            }
            return tasks;

        } catch (error) {
            console.log('error:', error);
            if (error.message === 'No tasks found') {
                throw new Error('No tasks found');
            }
            res.status(500).json({ message: 'Error fetching tasks', error });

        }
        // Fetch all tasks
    }

    // Update task status (based on column drag/drop)
    async updateTaskStatus(taskId, status,userId,res) {
        console.log('userId:', userId);
        try {
            const task = await TaskModel.findOneAndUpdate(
                { _id: taskId, userId: userId }, // Ensure the task belongs to the user
                { status },
                { new: true }
            );
            if (!task) {
                throw new Error('Task not found');
            }
            return task;
        } catch (error) {
            console.log('error:', error);
            if (error.message === 'Task not found') {
                res.status(404).json({ message: 'Task not found' });
            }
            res.status(500).json({ message: 'Error updating task', error });
            
        }
    }

    // Delete a task
    async deleteTask(taskId,userId) {
        try{
            const task = await TaskModel.findByIdAndDelete({_id:taskId,userId:userId});
            if (!task) {
                throw new Error('Task not found');
            }
            return task;

        }catch(error){
            // console.log('error:', error);
            if (error.message === 'Task not found') {
                throw new Error('Task not found');
            }
            throw new Error('Error deleting task');
        }
    }
}

module.exports = TaskService;
