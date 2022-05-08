const express = require('express');
const storyController = require('../controllers/story');
const { validateAuthorization } = require('../middleware/auth.middleware');

const router = express.Router();
router.post('', storyController.postStory);
router.get('', validateAuthorization, storyController.getStory);
router.get('/:story_id', validateAuthorization, storyController.getStoryById);
router.post('/:story_id/like', validateAuthorization, storyController.likeStory);
router.post('/:story_id/view', validateAuthorization, storyController.viewStory);

module.exports = router;