const mongoose = require('mongoose');

const Tag = new mongoose.Schema({
    value: { 
        type: String,
        enum: ['motivation', 'love', 'wishes'],
        default: 'love'
    }
});

module.exports = mongoose.model('ComplimentsTag', Tag);