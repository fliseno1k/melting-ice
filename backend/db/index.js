const mongoose = require('mongoose');

mongoose
    .connect('mongodb://me:password@mongo-primary,mongo-worker-1,mongo-worker-2/melting-ice')
    .then(r => {
        console.log('Connected');
    })
    .catch(e => {
        console.log(`Connection error`, e);
    });

module.exports = mongoose.connection;