const ApiError = require('../services/ApiError.service');

const handleError = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }

    return res.status(500).json({ 
        message: "Server-side erorr" 
    })
};

module.exports = {
    handleError
}