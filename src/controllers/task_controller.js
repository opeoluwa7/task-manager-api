const taskQueries = require('../config/db/task_queries');

const createNewTask = async (req, res, next) => {
    try {
        const task = req.body;
        task.priority = task.priority.toLowerCase();
        task.status = task.status.toLowerCase();

        task.user_id = req.user.user_id;

        if (!task) {
            return res.status(400).json({
                success: false,
                error: "Empty fields, Please fill out form"
            })
        }

        if (!task.user_id) {
            return res.status(401).json({
                success: false,
                error: "User not identified, please login again"
            })
        }

        const results = await taskQueries.createTask(
            task.title,
            task.description,
            task.status,
            task.priority,
            task.deadline,
            task.user_id
        );

        if (!results) {
            return res.status(400).json({
                success: false,
                error: "Something went wrong"
            })
        }

        res.status(201).json({
            success: true,
            task: results
        }
        )
    } catch (error) {
        next(error)
    }
}

const getAllTasks = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;

        const filters = req.query;
        let limit = 20;
        let page = 1;
        let offset = (page - 1) * limit;

        if (!user_id) {
            return res.status(401).json({
                success: false,
                error: "User not identified, please login again"
            })
        }

        const results = await taskQueries.getTasks(user_id, filters, limit, offset)

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No tasks found!"
            });
        }

        res.status(200).json({
            success: true,
            tasks: results
        });
    } catch (error) {
        next(error)
    }
}

const updateUserTask = async (req, res, next) => {
    try {
        const updatedTask = req.body;
        updatedTask.user_id = req.user.user_id;

        updatedTask.priority = updatedTask.priority.toLowerCase();
        updatedTask.status = updatedTask.status.toLowerCase();

        if (!updatedTask.user_id) {
            return res.status(401).json({
                success: false,
                error: "User not identified, please login again"
            })
        }

        const results = await taskQueries.updateTask(
            updatedTask.title,
            updatedTask.description,
            updatedTask.status,
            updatedTask.priority,
            updatedTask.deadline,
            updatedTask.user_id
        );

        if (!results) {
            return res.status(404).json({
                succcess: false,
                error: "No task found"
            })
        }

        res.status(200).json({
            success: true,
            updatedTask: results
        });
    } catch (error) {
        next(error)
    }
}

const deleteUserTask = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;

        if (!user_id) {
            return res.status(401).json({
                success: false,
                error: "User not identified, please login again"
            })
        }


        let task = await taskQueries.getTaskById(user_id)

        if (!task) {
            return res.status(404).json({ 
                success: false,
                error: "Task not found in the database!" 
            })
        }

        const result = await taskQueries.deleteTask(task.task_id);

        if(!result) {
            return res.status(400).json({
                success: false,
                error: "Something went wrong"
            })
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNewTask,
    getAllTasks,
    updateUserTask,
    deleteUserTask
}
