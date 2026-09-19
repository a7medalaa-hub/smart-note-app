const {
    registerUser,
    loginUser,
    logoutUser,
    requestPasswordReset,
    resetPassword: resetPasswordService
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

const forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        await requestPasswordReset(email);

        res.status(200).json({
            message:
                "If an account with this email exists, an OTP has been sent."
        });
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const {
            email,
            otp,
            newPassword
        } = req.body;

        await resetPasswordService(
            email,
            otp,
            newPassword
        );

        res.status(200).json({
            message: "Password reset successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    forgetPassword,
    resetPassword
};