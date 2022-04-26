const express = require('express');
const ComplimentsController = require('../controllers/compliments');

const router = express.Router();
router.post('/', ComplimentsController.postCompliment);
router.get('/', ComplimentsController.getRandomCompliment);

module.exports = router;