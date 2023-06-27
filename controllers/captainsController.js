const express = require("express");
const logs = express.Router();
const logsArray = require("../models/captainsLog");
// console.log(logsArray)

// INDEX
logs.get("/", (req, res) => {
  res.json(logsArray);
});

module.exports = logs