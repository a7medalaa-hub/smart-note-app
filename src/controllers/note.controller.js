const {
    createNote,
    deleteNote,
    getNoteById
} = require("../services/note.service");

const {
    summarizeText
} = require("../services/ai.service");

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

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const ownerId = req.user.sub;

        await deleteNote(
            id,
            ownerId
        );

        res.status(200).json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

const summarize = async (req, res, next) => {
    try {
        const { id } = req.params;

        const ownerId = req.user.sub;

        const note = await getNoteById(
            id,
            ownerId
        );

        const summary = await summarizeText(
            note.content
        );

        res.status(200).json({
            summary
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    remove,
    summarize
};