const {
    createNote
} = require("../services/note.service");

const create = async (req, res, next) => {
    try {
        const {
            title,
            content
        } = req.body;

        const ownerId = req.user.sub;

        const note = await createNote(
            title,
            content,
            ownerId
        );

        res.status(201).json({
            message: "Note created successfully",
            note: {
                id: note._id,
                title: note.title,
                content: note.content,
                ownerId: note.ownerId,
                createdAt: note.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create
};