const jwt = require('jsonwebtoken');

checkToken = (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            success: false, 
            message: "Auth error"
        });
    }

    try {
        const decoded = jwt.verify(token, "wonder");
        req.user = decoded.user;
        next();

    } catch(e) {
        return res.status(500).json({
            success: false, 
            message: "Invalid token"
        });
    }
};

module.exports = {
    checkToken
};