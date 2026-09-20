require("dotenv").config();

const express = require("express");

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const noteRoutes = require("./routes/note.routes");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Smart Note App");
});

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", noteRoutes);

app.use(errorHandler);

module.exports = app;