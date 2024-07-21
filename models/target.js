const mongoose = require("mongoose");
const targetSchema = new mongoose.Schema(
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
        total_day_to_complete: {
            type: Number,
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
        autoIndex: true,
    }
);
const target = new mongoose.model("target", targetSchema);
module.exports = target;
