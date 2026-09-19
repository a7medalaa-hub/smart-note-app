const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);

        const uniqueName = `${crypto.randomUUID()}${extension}`;

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage
});

module.exports = upload;