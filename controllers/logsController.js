const express = require("express");
const logs = express.Router();
let logsArray = require("../models/log.js");

// Index
logs.get("/", (req, res) => {
    res.json(logsArray);
});

// Show
logs.get("/:arrayIndex", (req, res) => {
    const arrayIndex = parseInt(req.params.arrayIndex);
    if (arrayIndex >= 0 && arrayIndex < logsArray.length){
        res.json(logsArray[arrayIndex]);
    } else {
        res.status(404).redirect("/404");
    }
});

// Create
logs.post("/", (req, res) => {
    const newLog = req.body;
    logsArray.push(newLog);
    res.json(newLog);
});

// Delete
logs.delete("/:arrayIndex", (req, res) => {
    const arrayIndex = parseInt(req.params.arrayIndex);
    if (arrayIndex >= 0 && arrayIndex < logsArray.length) {
        const deletedLog = logsArray.splice(arrayIndex, 1);
        res.json(deletedLog[0]);
    } else {
        res.status(404).json({ error: "Invalid index" });
    }
});

module.exports = logs;
