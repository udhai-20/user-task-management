

class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    // Create task
    async createTask(req, res) {
        const { taskName, description, status } = req.body;        
        try {
            // console.log('req?.user?._id:', req?.user)
           if(!req?.user?.id){
                return res.status(401).json({ message: 'UnAuthorized to do these operation' });
           }
            const newTask = await this.taskService.createTask({ taskName, description, status, userId: req?.user?.id });
            return res.status(201).json({ message: 'Task created successfully', task: newTask });
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({ message: 'Error creating task', error });
        }
    }

    // Get all tasks
    async getAllTasks(req, res) {
        // console.log('req:', req.user);
        try {
            if(!req?.user?.id){
                return res.status(401).json({ message: 'UnAuthorized to do these operation' });
           }
            const tasks = await this.taskService.getAllTasks(req?.user?.id);
            return res.status(200).json({ tasks });
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({ message: 'Error fetching tasks', error });
        }
    }

    // Update task status (drag and drop)
    async updateTaskStatus(req, res) {
        const { taskId } = req.params;
        const { status } = req.body;  // Status should be 'Pending', 'Completed', or 'Done'
        // console.log('status:', status);
        try {
            const updatedTask = await this.taskService.updateTaskStatus(taskId,status,req?.user?.id,res);
            return res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({ message: 'Error updating task', error });
        }
    }

    // Delete task
    async deleteTask(req, res) {
        const { taskId } = req.params;

        try {
            if(!req?.user?.id){
                return res.status(401).json({ message: 'UnAuthorized to do these operation' });
           }
            await this.taskService.deleteTask(taskId);
            return res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            if (error.message === 'Task not found') {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.status(500).json({ message: 'Error deleting task', error });
        }
    }
}

module.exports = TaskController;
