const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes
const authRouter = require('./routes/auth');
const complimentsRouter = require('./routes/compliments');

// Express app
const express = require('express');
const app = express();

// Load .evn file
require('dotenv').config();

// Setup app middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database error handler
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Setup app routes
app.use('/api/compliment', complimentsRouter);
app.use('/api/auth', authRouter);

// Run server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});