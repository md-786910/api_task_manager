const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
    {
        user_id: {
            type: new mongoose.Types.ObjectId,
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
            required: true,
            trim: true,
            minlength: [10, 'summary must be at least 10 characters long'],
            maxlength: [100, 'summary cannot be more than 100 characters long']
        },
        update_task_to_empty: {
            type: Date,
            required: false,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
        autoIndex: false,
    }
);
const task = new mongoose.model("task", taskSchema);
module.exports = task;
