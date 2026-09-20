const express = require("express");

const authenticate = require("../middlewares/auth.middleware");

const {
    create,
    remove
} = require("../controllers/note.controller");

const router = express.Router();

router.post(
    "/notes",
    authenticate,
    create
);

router.delete(
    "/notes/:id",
    authenticate,
    remove
);

module.exports = router;