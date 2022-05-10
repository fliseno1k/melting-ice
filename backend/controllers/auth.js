const mongoose = require('mongoose');
const User = require("../models/User");
const authService = require('../services/auth.service');

const millisecondsInOneDay = 24 * 60 * 1000;

const login = async (req, res, next) => {
    try {
        const { password } = req.body;
        const tokens = await authService.login(password);

        return res
            .status(200)
            .cookie("refreshToken", tokens.refreshToken, { maxAge: millisecondsInOneDay, httpOnly: true })
            .json(tokens);

    } catch(e) {
        next(e);
    }
};

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const tokens = await authService.refresh(refreshToken);

        return res
            .status(200)
            .cookie("refreshToken", tokens.refreshToken, { maxAge: millisecondsInOneDay, httpOnly: true })
            .json(tokens);

    } catch(e) {
        next(e);
    }
};

const createUser = async (req, res) => {
    try {
        const user = authService.createUser();
        return res
            .status(200)
            .json(user);
    } catch(e) {
        next(e);
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.find(mongoose.Types.ObjectId(req.user)).exec();
        return res.status(200).json({
            success: true, 
            user: {
                role: user[0].role
            }
        });

    } catch(e) {
        return res.status(400).json({
            success: false, 
            message: "Error in user fetching"
        });
    }
};

module.exports = {
    login,
    refresh,
    createUser,
    getUser,
};