const { taskModel, taskStatuses } = require("../models/task");
const { taskHistoryModel } = require("../models/taskHistory");
const { onePreviousDay, todays, tomorrows, yesterdays } = require("../utils/timeDateFormatter");
module.exports.createTask = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(500).json({
                message: "Invalid request body",
            });
        }
        const { title, summary } = req.body;
        await taskModel.create({
            user_id: req.user.id,
            title,
            summary,
        });
        res.status(201).json({ message: "Task created successfully" });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};
module.exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Invalid task id",
            });
        }
        if (!req.body) {
            return res.status(500).json({
                message: "Invalid request body",
            });
        }
        const { title, summary } = req.body;
        console.log({ title, summary });
        const result = await taskModel.findOneAndUpdate(
            { _id: id },
            {
                $set: { title, summary },
            },
            {
                new: true,
            }
        );
        console.log({ result });
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
};
module.exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Invalid task id",
            });
        }
        await taskModel.findOneAndUpdate(
            { user_id: req.user.id, _id: id },
            {
                $set: {
                    is_deleted: true,
                },
            }
        );
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log({ error });
        res.status(500).json({
            message: error,
        });
    }
};
module.exports.completetask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Invalid task id",
            });
        }
        const status = req.body.status ? taskStatuses.COMPLETED : taskStatuses.NEW;
        await taskModel.findOneAndUpdate(
            { user_id: req.user.id, _id: id },
            {
                $set: {
                    status,
                },
            }
        );

        // run updates status of task history
        await taskHistoryModel.updateStatus({
            user_id: req.user.id,
            _id: id,
            status
        });

        res.status(201).json({ message: "Task completed successfully" });
    } catch (error) {
        console.log({ error });
        res.status(500).json({
            message: error,
        });
    }
};
module.exports.list = async (req, res) => {
    try {
        // Run script to reset task everydays and update its createdAt and updatedAt

        const taskData = await taskModel
            .find({
                user_id: req.user.id, is_deleted: false
            })
            .sort({
                status: 1,
                createdAt: -1,
            });
        const taskCompletedCount = await taskModel.countDocuments({
            user_id: req.user.id,
            is_deleted: 0,
            status: taskStatuses.COMPLETED,
        });
        let data = {
            tasks: taskData,
            count: taskCompletedCount,
        };
        res.status(200).json(data);
    } catch (error) {
        res.status(401).json({
            message: error,
        });
    }
};
module.exports.completedTaskHistory = async (req, res) => {
    try {


        const taskData = await taskHistoryModel
            .find({
                user_id: req.user.id,
                status: taskStatuses.COMPLETED,
                createdAt: {
                    $gte: yesterdays(),
                    $lt: todays()

                },
            })
            .sort({
                createdAt: -1,
            });
        res.status(200).json(taskData);
    } catch (error) {
        res.status(401).json({
            message: error,
        });
    }
};
module.exports.pendingTaskHistory = async (req, res) => {
    try {

        const taskData = await taskHistoryModel
            .find({
                user_id: req.user.id,
                status: taskStatuses.NEW,
                createdAt: {
                    $gte: yesterdays(),
                    $lt: todays()

                },
            })
            .sort({
                createdAt: -1,
            });
        res.status(200).json(taskData);
    } catch (error) {
        res.status(401).json({
            message: error,
        });
    }
};
