const Note = require("../models/Note");

const createNote = async (title, content, ownerId) => {
    const note = new Note({
        title,
        content,
        ownerId
    });

    await note.save();

    return note;
};

const deleteNote = async (noteId, ownerId) => {
    const note = await Note.findOne({
        _id: noteId,
        ownerId
    });

    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }

    await Note.deleteOne({
        _id: noteId,
        ownerId
    });
};

const getNotes = async ({
    userId,
    title,
    createdFrom,
    createdTo,
    page = 1,
    limit = 10
}) => {
    const filter = {};

    if (userId) {
        filter.ownerId = userId;
    }

    if (title) {
        filter.title = {
            $regex: title,
            $options: "i"
        };
    }

    if (createdFrom || createdTo) {
        filter.createdAt = {};

        if (createdFrom) {
            filter.createdAt.$gte = new Date(createdFrom);
        }

        if (createdTo) {
            filter.createdAt.$lte = new Date(createdTo);
        }
    }

    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 50);

    const skip = (safePage - 1) * safeLimit;

    const notes = await Note.find(filter)
        .populate(
            "ownerId",
            "email profilePicture"
        )
        .sort({
            createdAt: -1
        })
        .skip(skip)
        .limit(safeLimit);

    return notes;
};

module.exports = {
    createNote,
    deleteNote,
    getNotes
};