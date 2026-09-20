const express = require("express");

const authenticate = require("../middlewares/auth.middleware");

const {
    create
} = require("../controllers/note.controller");

const router = express.Router();

router.post(
    "/notes",
    authenticate,
    create
);

module.exports = router;