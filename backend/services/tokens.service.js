const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken.model');

const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch(e) {
        return null;
    }
};

const verifyAccessToken = (token) => verifyToken(token, process.env.ACCESS_TOKEN_SECRET);

const verifyRefreshToken = (token) => verifyToken(token, process.env.REFRESH_TOKEN_SECRET);

const createRefreshTokenRecord = async (token, user) => {
    const data = await RefreshToken.findOne({ user });

    if (data) {
        data.refreshToken = token;
        return data.save();
    }

    const newRefreshToken = new RefreshToken({
        token, 
        user,
    });
    
    return await newRefreshToken.save();
};

const removeTokenRecord = async (token) => {
    return await RefreshToken.deleteOne({ token });
};

const findTokenRecord = async (token) => {
    return await RefreshToken.findOne({ token });
};

const generateTokensCouple = async (payload) => {
    const accessToken = jwt.sign(
        payload, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_LIFE }
    );

    const refreshToken = jwt.sign(
        payload, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: process.env.REFRESH_TOKEN_LIFE }
    );

    return {
        accessToken, 
        refreshToken
    };
};

module.exports ={
    verifyAccessToken,
    verifyRefreshToken,
    createRefreshTokenRecord,
    removeTokenRecord,
    findTokenRecord, 
    generateTokensCouple
};