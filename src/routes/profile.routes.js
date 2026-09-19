const express = require("express");

const authenticate = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    uploadProfilePicture
} = require("../controllers/profile.controller");

const router = express.Router();

router.patch(
    "/uplaod-profile-pic",
    authenticate,
    upload.single("profilePicture"),
    uploadProfilePicture
);

module.exports = router;