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

module.exports = {
    createNote,
    deleteNote
};