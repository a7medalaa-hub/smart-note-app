const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Smart Note App");
});

module.exports = app;