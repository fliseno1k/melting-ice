const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/melting-ice')
    .catch(e => {
        console.log(`Connection error`, e);
    });

const db = mongoose.connection;

module.exports = db;