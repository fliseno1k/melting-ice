const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Middleware 
const errorMiddleware = require('./middleware/error.middleware');

// Routes
const authRouter = require('./routes/auth.router');
const complimentsRouter = require('./routes/compliments.router');
const storyRouter = require('./routes/story.router');

// Express app
const express = require('express');
const app = express();

// Load .evn file
require('dotenv').config();

// Setup app middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(errorMiddleware.handleError);

// Database error handler
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Setup app routes
app.use('/static', express.static(__dirname + '/public'));
app.use('/api/compliment', complimentsRouter);
app.use('/api/story', storyRouter);
app.use('/api/auth', authRouter);

// Run server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});