const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (email, password) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        throw error;
    }

    const user = new User({
        email,
        password
    });

    await user.save();

    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    return user;
};

module.exports = {
    registerUser,
    loginUser
};