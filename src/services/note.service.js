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

module.exports = {
    createNote
};