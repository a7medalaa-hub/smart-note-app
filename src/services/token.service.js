const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(
    path.join(__dirname, "../config/keys/private.pem"),
    "utf8"
);

const publicKey = fs.readFileSync(
    path.join(__dirname, "../config/keys/public.pem"),
    "utf8"
);

const generateToken = (userId) => {
    const jti = crypto.randomUUID();

    return jwt.sign(
        {
            sub: userId,
            jti
        },
        privateKey,
        {
            algorithm: "RS256",
            expiresIn: "1h"
        }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, publicKey, {
        algorithms: ["RS256"]
    });
};

module.exports = {
    generateToken,
    verifyToken
};