const mongoose = require("mongoose");
const authSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        set_time_to_notify: { type: String, required: true, default: "12 PM" },
        schedule_time: { type: String, required: true, default: "12 PM" },
        is_active: {
            type: Boolean,
            default: false,
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
const auth = new mongoose.model("auth", authSchema);
module.exports = auth;
