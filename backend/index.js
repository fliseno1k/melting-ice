// const db = require('./db');
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

const whitelist = [
    'https://melting-ice.vercel.app', 
    'http://193.104.57.106', 
    'http://localhost:3000'
];

const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Cors error');
            callback(new Error('Not allowed by CORS'));
        }
    }
};

// Setup app middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(errorMiddleware.handleError);

// Database events listeners
db
    .on('error', console.error.bind(console, 'MongoDB connection error:'))
    .on('connect', () => console.log.bind(console, 'MongoDB connected'));

// Setup app routes
app.use(express.static(__dirname + '../frontend/build'));
app.use('/static', express.static(__dirname + '/public'));
app.use('/api/compliment', complimentsRouter);
app.use('/api/story', storyRouter);
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    return res.send("Hello world!");
});

// Run server
app.listen(process.env.PORT, () => {
    console.log(process.env.HOSTNAME);
    console.log(`Server running on port ${process.env.PORT}`);
});