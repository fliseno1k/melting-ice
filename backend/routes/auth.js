const express = require('express');
const AuthController = require('../controllers/auth');

const router = express.Router();
router.post('/login', AuthController.login);
router.post('/create', AuthController.createUser);
router.get('/user', AuthController.getUser);

module.exports = router;