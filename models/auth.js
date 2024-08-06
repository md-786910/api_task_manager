const mongoose = require("mongoose");
const authSchema = new mongoose.Schema(
    {
        display_name: { type: String, required: true },
        email: { type: String, required: true },
        photo_url: { type: String, required: false },
        phone_number: { type: String, required: false },
        set_time_to_notify: { type: String, required: false, default: "12 PM" },
        schedule_time: { type: String, required: false, default: "12 PM" },
        generate_report_time: { type: String, required: false },
        is_active: {
            type: Boolean,
            default: false,
        },
        is_suspend_account: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        autoIndex: false,
    }
);
const auth = new mongoose.model("auth", authSchema);
module.exports = auth;
