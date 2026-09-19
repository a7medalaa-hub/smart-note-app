const express = require("express");
const authenticate = require("../middlewares/auth.middleware");

const {
    register,
    login
} = require("../controllers/auth.controller");

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

router.get("/me", authenticate, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user
    });
});

module.exports = router;