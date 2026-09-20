require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const {
    graphqlHTTP
} = require("express-graphql");

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const noteRoutes = require("./routes/note.routes");

const authenticate = require("./middlewares/auth.middleware");

const schema = require("./graphql/schema");
const root = require("./graphql/note.resolver");

const notFound = require("./middlewares/not-found.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});

app.use(helmet());

app.use(cors());

app.use(limiter);

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

app.use(notFound);

app.use(errorHandler);

module.exports = app;