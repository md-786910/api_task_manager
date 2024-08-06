const { createTask, updateTask, list, deleteTask, completetask, completedTaskHistory, pendingTaskHistory } = require('../controllers/taskController');

const taskRoutes = require('express').Router();

taskRoutes.route("/").
    post(createTask).get(list)


taskRoutes.route("/:id").post(completetask).patch(updateTask).delete(deleteTask)

taskRoutes.route("/completed-task").get(completedTaskHistory)
taskRoutes.route("/pending-task").get(pendingTaskHistory)

module.exports = taskRoutes;