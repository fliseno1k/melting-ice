const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const complimentsRouter = require('./routes/compliments');
const authRouter = require('./routes/auth');

const API_PORT = 3000;

// Setup app middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Setup database
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
app.get('/', (req, res) => res.send('Hello world'));
app.use('/api/compliment', complimentsRouter);
app.use('/api/auth', authRouter);

// Run server
app.listen(API_PORT, () => console.log('Server running...'));