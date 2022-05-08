const mongoose = require('mongoose');


const RefreshToken = new mongoose.Schema(
    {
        token: { type: String, required: true },
        user: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("refresh", RefreshToken);