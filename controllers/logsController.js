const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log");

// INDEX
logs.get("/", (req, res) => {
    res.json(logsArray);
});

// logs.get ("/", (req, res) => {
//     const foo = JSON.parse(JSON.stringify(logsArray)) ;
//     res.status(200).json(foo);
// });

// SHOW
logs.get("/:arrayIndex", (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
        res.json(logsArray[req.params.arrayIndex]);
    }
    else {
        res.status(404).redirect("/404");
    }
});

// CREATE
logs.post("/", (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
});

// DELETE
logs.delete("/:arrayIndex", (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
        const deletedLog = logsArray.splice(req.params.arrayIndex, 1);
        res.json(deletedLog);
    }
    else {
        res.status(404).redirect("/404");
    }
});

// UPDATE
logs.put("/:arrayIndex", (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
        logsArray[req.params.arrayIndex] = req.body;
        res.status(200).json(logsArray[req.params.arrayIndex]);
    }
    else {
        res.status(404).redirect("/404");
    }
  });

module.exports = logs;