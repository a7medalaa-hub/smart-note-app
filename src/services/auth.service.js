const crypto = require("crypto");

const User = require("../models/User");
const RevokedToken = require("../models/RevokedToken");
const PasswordResetOtp = require("../models/PasswordResetOtp");

const bcrypt = require("bcrypt");

const {
    sendPasswordResetOtp
} = require("./email.service");

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

const logoutUser = async (jti, exp) => {
    const existingRevokedToken = await RevokedToken.findOne({ jti });

    if (existingRevokedToken) {
        return;
    }

    await RevokedToken.create({
        jti,
        expiresAt: new Date(exp * 1000)
    });
};

const createPasswordResetOtp = async (user) => {
    const otp = crypto.randomInt(100000, 1000000).toString();

    const otpHash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    const expiresAt = new Date(
        Date.now() + 10 * 60 * 1000
    );

    await PasswordResetOtp.deleteMany({
        userId: user._id,
        usedAt: null
    });

    await PasswordResetOtp.create({
        userId: user._id,
        email: user.email,
        otpHash,
        expiresAt
    });

    return otp;
};

const requestPasswordReset = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        return;
    }

    const otp = await createPasswordResetOtp(user);

    await sendPasswordResetOtp(
        user.email,
        otp
    );
};

const resetPassword = async (
    email,
    otp,
    newPassword
) => {
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("Invalid or expired OTP");
        error.statusCode = 400;
        throw error;
    }

    const resetOtp = await PasswordResetOtp.findOne({
        userId: user._id,
        email: user.email,
        usedAt: null
    }).sort({
        createdAt: -1
    });

    if (!resetOtp) {
        const error = new Error("Invalid or expired OTP");
        error.statusCode = 400;
        throw error;
    }

    if (resetOtp.expiresAt < new Date()) {
        const error = new Error("Invalid or expired OTP");
        error.statusCode = 400;
        throw error;
    }

    const otpHash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    if (otpHash !== resetOtp.otpHash) {
        const error = new Error("Invalid or expired OTP");
        error.statusCode = 400;
        throw error;
    }

    user.password = newPassword;

    await user.save();

    resetOtp.usedAt = new Date();

    await resetOtp.save();
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    createPasswordResetOtp,
    requestPasswordReset,
    resetPassword
};