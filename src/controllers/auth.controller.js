const { registerUser } = require("../services/auth.service");

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await registerUser(email, password);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register
};