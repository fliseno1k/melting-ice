const Compliment = require('../models/Compliment');

postCompliment = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(404).json({
            success: false,
            error: 'You must provide a compliment data'
        })
    }

    const compliment = new Compliment(body);

    if (!compliment) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    compliment.save().then(() => {
        return res.status(201).json({
            success: true, 
            id: compliment._id,
            message: 'Compliment created'
        });
    });
};

getRandomCompliment = (req, res) => {
    Compliment
        .aggregate([{ $sample: { size: 1 }}])
        .exec((error, result) => {
            if (error) {
                res.status(404).json({
                    success: false, 
                    message: 'No one compliment record found'
                });
            }

            const { text, tag } = result[0];

            res.status(201).json({
                success: true, 
                compliment: {
                    text,
                    tag
                },
                message: 'Compliment found'
            });
        });
};

module.exports = {
    postCompliment,
    getRandomCompliment
}