const mongoose = require("mongoose");
const { taskModel } = require("./task");
const taskStatuses = {
    NEW: 0,
    COMPLETED: 1,
}
const taskHistorySchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
            required: true,
        },
        task_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "task",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        summary: {
            type: String,
            required: false,
        },
        status: {
            type: Number,
            enum: Object.values(taskStatuses),
            default: 0
        },
    },
    {
        timestamps: true,
        autoIndex: false,
    }
);

// Defined some static functions of models 
taskHistorySchema.statics.updateStatus = async function (task, next) {
    try {
        const { user_id, _id, status } = task;
        const existHistory = await this.findOne({ user_id, task_id: _id })
        if (existHistory) {
            // then update the status
            existHistory.status = status;
            await existHistory.save()
        } else {
            // create new one
            const tasks = await taskModel.findOne({
                user_id,
                _id,
                status
            })
            let { title, summary } = tasks;
            await this.create({ user_id, task_id: _id, title, summary, status })
        }

        // return 1;
    } catch (error) {
        console.log({ error })
        throw new Error("error updating history");
    }

}


const taskHistoryModel = new mongoose.model("task_history", taskHistorySchema);
module.exports = {
    taskHistoryModel
}
