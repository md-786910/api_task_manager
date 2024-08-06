const mongoose = require("mongoose");
const taskStatuses = {
    NEW: 0,
    COMPLETED: 1,
}
const taskSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
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
        update_task_to_empty: {
            type: Date,
            required: false,
        },
        status: {
            type: Number,
            enum: Object.values(taskStatuses),
            default: 0
        },
        is_active: {
            type: Boolean,
            default: true,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        autoIndex: false,
    }
);

// Defined some static method

const taskModel = new mongoose.model("task", taskSchema);
module.exports = {
    taskStatuses,
    taskModel
}
