const express = require('express');
const TaskController = require('../controller/taskController');
const validateRequest = require('../utils/dtoValidator');

const authMiddleWare = require('../authMiddleware/authMiddleWare');
const TaskDtO = require('../dto/userTasks.dto');
const TaskService = require('../service/taskService');
const { maxLength } = require('class-validator');


const taskController = new TaskController(new TaskService());

class TaskRoutes {
    static routes() {
        const router = express.Router();

        router.post("/", authMiddleWare.auth, (req, res, next) => {
            const errors = validateRequest(TaskDtO, req.body);
            if (errors) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            next();
        }, taskController.createTask.bind(taskController));

        router.get("/", authMiddleWare.auth, taskController.getAllTasks.bind(taskController));

        router.put("/update-status/:taskId", authMiddleWare.auth,
            (req, res, next) => {
                const errors = validateRequest({ type: "string", required: true }, req.body);
                const paramErr = validateRequest({ taskId: req.params.taskId, required: true, maxLength: 24 }, req.params);
                const check = errors || paramErr;
                if (errors || paramErr) {
                    return res.status(400).json({ message: "Validation failed", check });
                }
                next();
            },
            taskController.updateTaskStatus.bind(taskController));

        router.delete("/del/:taskId", authMiddleWare.auth, (req, res, next) => {
            const errors = validateRequest({ 
                taskId: { required: true, maxLength: 24 ,type:"string"}  // Define rules properly
            }, 
            req.params);
            if (errors) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            next();
        },taskController.deleteTask.bind(taskController));
        

        return router;
    }
}

module.exports = TaskRoutes;
