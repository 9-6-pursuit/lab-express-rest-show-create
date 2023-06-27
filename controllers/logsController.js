const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");
//GET/SHOW array of log
logs.get("/", (req, res) => {
  res.json(logsArray);
});

// SHOW only one log
logs.get("/:arrayIndex", (req, res) => {
  if (logsArray[req.params.arrayIndex]) {
    res.json(logsArray[req.params.arrayIndex]);
  } else {
    res.status(404).redirect("/logs");
  }
});

// CREATE/PUT a new log
logs.post("/", (req, res) => {
  logsArray.push(req.body);
  res.json(logsArray[logsArray.length - 1]);
});


module.exports = logs;