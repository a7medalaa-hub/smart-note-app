const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendPasswordResetOtp = async (email, otp) => {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Smart Note - Password Reset OTP",

        text: `Your password reset OTP is: ${otp}. This OTP expires in 10 minutes.`
    });
};

module.exports = {
    sendPasswordResetOtp
};