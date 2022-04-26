const mongoose = require('mongoose');

const User = new mongoose.Schema({
    role: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model("user", User);