const mongoose = require('mongoose');

mongoose
    .connect('mongodb://me:password@mongo-prumary,mongo-worker-1,mongo-worker-2/melting-ice')
    .catch(e => {
        console.log(`Connection error`, e);
    });

module.exports = mongoose.connection;