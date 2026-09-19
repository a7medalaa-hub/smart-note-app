const {
    registerUser,
    loginUser,
    logoutUser
} = require("../services/auth.service");

const { generateToken } = require("../services/token.service");

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

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);

        const token = generateToken(user._id.toString());

        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);

        if (user._id.toString() !== req.user.sub) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;

            return next(error);
        }

        await logoutUser(
            req.user.jti,
            req.user.exp
        );

        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout
};