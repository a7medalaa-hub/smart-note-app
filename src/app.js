require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Smart Note App");
});

const authRoutes = require("./routes/auth.routes");

app.use("/", authRoutes);

module.exports = app;