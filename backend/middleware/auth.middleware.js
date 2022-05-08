const ApiError = require('../services/ApiError.service');
const tokenService = require('../services/tokens.service');

const validateAuthorization = (req, res, next) => {
    try {
        const { authorization } = req.headers.authorization;
        if (!authorization) {
            return next(ApiError.UnauthorizedEror());
        }

        const accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedEror());
        }

        const payload = tokenService.verifyAccessToken(accessToken);
        if (!payload) {
            return next(ApiError.UnauthorizedEror());
        }

        req.user = payload.user;
        next();

    } catch(e) {
        return next(ApiError.UnauthorizedEror());
    }
};

module.exports = {
    validateAuthorization
};