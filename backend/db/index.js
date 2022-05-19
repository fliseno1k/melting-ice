const mongoose = require('mongoose');

mongoose
    .connect('mongodb://me:password@127.0.0.1:27017/melting-ice')
    .catch(e => {
        console.log(`Connection error`, e);
    });

module.exports = mongoose.connection;