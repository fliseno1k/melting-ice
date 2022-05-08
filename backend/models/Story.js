const mongoose = require('mongoose');


const Story = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        imageUrl: { type: String, required: true },
        modelUrl: { type: String, required: true },
        likes: { type: Number, required: false, default: 0 },
        views: { type: Number, required: false, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model("story", Story);