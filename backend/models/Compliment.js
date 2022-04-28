const mongoose = require('mongoose');


const Compliment = new mongoose.Schema(
    {
        tag: {
            type: String, 
            enum: ["love", "motivation", "wishes"],
            default: "love"
        },
        text: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("compliment", Compliment);