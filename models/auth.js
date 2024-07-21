const mongoose = require("mongoose");
const authSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true },
    },
    {
        timestamps: true,
        autoIndex: true,
    }
);
const auth = new mongoose.model("auth", authSchema);
module.exports = auth;
