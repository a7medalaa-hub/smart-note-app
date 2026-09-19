const mongoose = require("mongoose");

const passwordResetOtpSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        otpHash: {
            type: String,
            required: true
        },

        expiresAt: {
            type: Date,
            required: true
        },

        usedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

passwordResetOtpSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

const PasswordResetOtp = mongoose.model(
    "PasswordResetOtp",
    passwordResetOtpSchema
);

module.exports = PasswordResetOtp;