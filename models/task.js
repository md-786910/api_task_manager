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
