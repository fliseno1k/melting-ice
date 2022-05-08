const bcrypt = require('bcryptjs');
const User = require("../models/User");
const ApiError = require('./ApiError.service');
const tokenService = require('./tokens.service');


const login = async (password) => {
    const user = await User.findOne({ role: "admin" }).exec();
    if (!user) {
        throw ApiError.BadRequestError("User with this data not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw ApiError.BadRequestError("Incorrect password");
    };

    const payload = {
        user: user._id.valueOf()
    };

    const tokens = await tokenService.generateTokensCouple(payload);
    await tokenService.createRefreshTokenRecord(tokens.refreshToken, payload.user);

    return tokens;
};

const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw ApiError.UnauthorizedEror();
    }

    const payload = tokenService.verifyRefreshToken(refreshToken);
    const tokenRecord = tokenService.findTokenRecord(refreshToken);
    
    if (!payload || !tokenRecord) {
        throw ApiError.UnauthorizedEror();
    }

    const tokens = await tokenService.generateTokensCouple({ user: payload.user });
    await tokenService.createRefreshTokenRecord(tokens.refreshToken, payload.user);

    return tokens;
};

const createUser = async () => {

    // TO-DO: check records count, if more than 1 throw error, else create record

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(process.env.LOGIN_PASSWORD, salt);
    const user = await new User({
        role: "admin",
        password
    }).save();

    return user;
};

module.exports = {
    login,
    refresh,
    createUser
};