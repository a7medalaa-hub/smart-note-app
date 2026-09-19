const User = require("../models/User");

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

module.exports = {
    registerUser
};