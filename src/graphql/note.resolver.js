const {
    getNotes
} = require("../services/note.service");

const root = {
    notes: async (args) => {
        const notes = await getNotes({
            userId: args.userId,
            title: args.title,
            createdFrom: args.createdFrom,
            createdTo: args.createdTo,
            page: args.page,
            limit: args.limit
        });

        return notes.map((note) => ({
            id: note._id.toString(),
            title: note.title,
            content: note.content,
            ownerId: note.ownerId._id.toString(),

            owner: {
                id: note.ownerId._id.toString(),
                email: note.ownerId.email,
                profilePicture: note.ownerId.profilePicture
            },

            createdAt: note.createdAt.toISOString(),
            updatedAt: note.updatedAt.toISOString()
        }));
    }
};

module.exports = root;