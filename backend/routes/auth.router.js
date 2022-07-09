const express = require('express');
const authController = require('../controllers/auth');
const { validateAuthorization } = require('../middleware/auth.middleware');

const router = express.Router();
router.post('/login', authController.login);
router.post('/create', authController.createUser);
router.get('/user', validateAuthorization, authController.getUser);
router.get('/refresh', authController.refresh);

module.exports = router;