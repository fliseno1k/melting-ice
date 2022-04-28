const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require("../models/User");


const login = async (req, res) => {
    const { password } = req.body;
    
    try {
        const user = await User.findOne({ role: "admin" }).exec();

        if (!user) {
            return res.status(400).json({
                success: false, 
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false, 
                message: "Incorrect password"
            });
        }

        const payload = {
            user: user._id.valueOf()
        };

        jwt.sign(payload, "wonder", { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;

            res.status(200).json({
                success: true,
                message: "Successfuly signin",
                token
            });
        });

    } catch(e) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const createUser = async (req, res) => {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash("чудо", salt);

    const user = new User({
        role: "admin",
        password
    });

    await user.save();

    return res.status(200).json({
        success: true, 
        message: "Default user created"
    });
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
    createUser,
    getUser
};