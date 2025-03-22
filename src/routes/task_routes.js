const router = require("express").Router();

const TaskController = require("../controllers/task_controller.js");
const isAuthenticated = require("../middlewares/is_authenticated.js")

router.get('/all', [isAuthenticated.check], TaskController.getAllTasks);
router.post('/create-task', [isAuthenticated.check], TaskController.createNewTask);
router.patch('/update-task', [isAuthenticated.check], TaskController.updateUserTask);
router.delete('/delete-task', [isAuthenticated.check], TaskController.deleteUserTask);

module.exports = router;