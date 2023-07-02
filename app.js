//dependencies 
const express = require('express');

//configuration
const app = express();
// const bookmarksController = require("./controllers/bookmarksController.js");
// app.use("/bookmarks", bookmarksController);

//middleware
app.use(express.json()) //parse incoming json


//routes
app.get("/", (req, res) => {
    res.send("Welcome to Captain's log");
});

const logsController = require("./controllers/logsController.js");
app.use("/logs", logsController)

//404 page
app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found."});
});

//export
module.exports = app;