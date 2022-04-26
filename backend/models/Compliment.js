const mongoose = require('mongoose');
const ComplimentTag = require('./ComplimentTag').schema;


const Compliment = new mongoose.Schema(
    {
        text: { type: String, required: true },
        // tag: ComplimentTag
    },
    { timestamps: true }
);

module.exports = mongoose.model('Compliments', Compliment);