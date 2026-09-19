const User = require("../models/User");

const uploadProfilePicture = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error("Profile picture is required");
            error.statusCode = 400;

            return next(error);
        }

        const user = await User.findById(req.user.sub);

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;

            return next(error);
        }

        user.profilePicture = req.file.path;

        await user.save();

        res.status(200).json({
            message: "Profile picture uploaded successfully",
            profilePicture: user.profilePicture
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadProfilePicture
};