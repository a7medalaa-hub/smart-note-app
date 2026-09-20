const express = require("express");

const authenticate = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
    create,
    remove,
    summarize
} = require("../controllers/note.controller");

const {
    createNoteSchema
} = require("../validators/note.validator");

const router = express.Router();

router.post(
    "/notes",
    authenticate,
    validate(createNoteSchema),
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