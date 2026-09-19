const express = require("express");

const {
    register,
    login,
    logout
} = require("../controllers/auth.controller");

const authenticate = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");

const {
    registerSchema,
    loginSchema
} = require("../validators/auth.validator");

const router = express.Router();

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.post(
    "/logout",
    authenticate,
    validate(loginSchema),
    logout
);

router.get(
    "/me",
    authenticate,
    (req, res) => {
        res.json({
            message: "You are authenticated",
            user: req.user
        });
    }
);

module.exports = router;