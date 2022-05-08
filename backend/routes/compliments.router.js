const express = require('express');
const complimentsController = require('../controllers/compliments');
const { validateAuthorization } = require('../middleware/auth.middleware');

const router = express.Router();
router.post('/', complimentsController.postCompliment);
router.get('/', validateAuthorization, complimentsController.getRandomCompliment);

module.exports = router;