const express = require("express");

const authenticate = require("../middlewares/auth.middleware");

const {
    create,
    remove,
    summarize
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

router.post(
    "/notes/:id/summarize",
    authenticate,
    summarize
);

module.exports = router;