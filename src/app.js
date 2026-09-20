require("dotenv").config();

const express = require("express");
const {
    graphqlHTTP
} = require("express-graphql");

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const noteRoutes = require("./routes/note.routes");

const authenticate = require("./middlewares/auth.middleware");

const schema = require("./graphql/schema");
const root = require("./graphql/note.resolver");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Smart Note App");
});

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", noteRoutes);

app.use(
    "/graphql",
    authenticate,
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
);

app.use(errorHandler);

module.exports = app;