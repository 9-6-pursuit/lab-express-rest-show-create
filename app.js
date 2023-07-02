// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();
const logsArray = require("./models/log.js");
const log = require("./models/log.js");


// ROUTES
app.get("/", (req, res) => {
    res.send("welcome to the captain's log");
});

app.get("/logs", (req, res) => {
    res.send(logsArray);
});

app.get("/logs/:arrayIndex", (req, res) => {
    if (typeof logsArray[req.params.arrayIndex] === "undefined") {
        res.redirect("/logs")
    } else {
        res.send(logsArray[`${req.params.arrayIndex}`]);
    }
});

app.post("/logs", (req, res) => {
    
})


// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });

// EXPORT
module.exports = app;