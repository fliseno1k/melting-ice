const mongoose = require("mongoose");
const Story = require("../models/Story");
const SketchfabModelLoader = require("../services/SketchfabModelLoader");


const extractRequiredFields = (story) => ({
    id: story._id.valueOf(), 
    title: story.title, 
    content: story.content, 
    imageUrl: story.imageUrl, 
    modelUrl: story.modelUrl,
    likes: story.likes,
    views: story.views,
    date: story.createdAt
});

const postStory = (req, res) => {
    const { body } = req;
    const modelLoader = new SketchfabModelLoader();

    try {
        modelLoader.loadModel(body.url).then(({ imageUrl, sceneUrl }) => {
            const story = new Story({
                title: body.title, 
                content: body.content, 
                imageUrl, 
                modelUrl: sceneUrl
            });

            if (!story) {
                return res.status(400).json({
                    success: false,
                    error: err
                });
            }

            story.save().then(() => {
                return res.status(201).json({
                    success: true, 
                    id: story._id,
                    message: 'Story created'
                });
            });
        });
    } catch(err) {
        return res.status(400).json({
            success: false, 
            message: err
        });
    }
};

const getStory = (req, res) => {
    Story.find().exec((error, result) => {
        if (error) {
            return res.status(404).json({
                success: false,
                message: "No one story record found"
            });
        }

        const modifiedStories = result.map(story => extractRequiredFields(story));

        return res.status(200).json({
            success: true,
            stories: modifiedStories
        });
    });
};

const getStoryById = async (req, res) => {
    const { story_id } = req.params;

    const story = await Story.findById(new mongoose.Types.ObjectId(story_id));
    
    if (story) {
        return res.status(200).json({
            success: true, 
            story: extractRequiredFields(story)
        });
    }

    return res.status(404).json({
        success: false,
        message: "Story record with this id not found" 
    });
};

const likeStory = async (req, res) => {
    const { story_id } = req.params;
    const story = await Story.findById(story_id);

    if (!story) {
        return res.status(404).json({
            success: false, 
            message: "No one story with this id not found"
        });
    }

    story.likes++;
    story.save().then(() => {
        return res.status(200).json({
            success: true, 
            message: 'Story liked'
        });
    });
};

const viewStory = async (req, res) => {
    const { story_id } = req.params;
    const story = await Story.findById(story_id);

    if (!story) {
        return res.status(404).json({
            success: false, 
            message: "No one story with this id not found"
        });
    }

    story.views++;
    story.save().then(() => {
        return res.status(200).json({
            success: true, 
            message: 'Story liked'
        });
    });
};

module.exports = {
    postStory,
    getStory,
    getStoryById,
    likeStory,
    viewStory
};