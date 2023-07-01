const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");

// GET / route
logs.get("/", (req, res) => {
    res.json(logsArray);
});

// POST / route
logs.post("/", (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
});

// GET /:arrayIndex route
logs.get("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    if(logsArray[arrayIndex]) {
        res.json(logsArray[arrayIndex]);
    } else {
        res.status(404).send({ error: 'Invalid array index' });
    }
});


// PUT /:arrayIndex route
logs.put("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    if(logsArray[arrayIndex]) {
        logsArray[arrayIndex] = req.body;
        res.json(logsArray[arrayIndex]);
    } else {
        res.status(400).json({ error: 'Invalid array index' });
    }
});

// DELETE /:arrayIndex route
logs.delete("/:arrayIndex", (req, res) => {
    const { arrayIndex } = req.params;
    if(logsArray[arrayIndex]) {
        logsArray.splice(arrayIndex, 1);
        res.json(logsArray);
    } else {
        res.status(400).json({ error: 'Invalid array index' });
    }
});

module.exports = logs;
