const { verifyToken } = require("../services/token.service");
const RevokedToken = require("../models/RevokedToken");

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            const error = new Error("Authentication required");
            error.statusCode = 401;

            return next(error);
        }

        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            const error = new Error("Invalid authorization format");
            error.statusCode = 401;

            return next(error);
        }

        const decoded = verifyToken(token);

        const revokedToken = await RevokedToken.findOne({
            jti: decoded.jti
        });

        if (revokedToken) {
            const error = new Error("Token has been revoked");
            error.statusCode = 401;

            return next(error);
        }

        req.user = decoded;

        next();
    } catch (error) {
        const authError = new Error("Invalid or expired token");
        authError.statusCode = 401;

        next(authError);
    }
};

module.exports = authenticate;