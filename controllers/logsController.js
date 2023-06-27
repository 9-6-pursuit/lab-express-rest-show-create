const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");
// INDEX
logs.get("/", (req, res) => {
  res.json(logsArray);
});

// SHOW
logs.get("/:arrayIndex", (req, res) => {
  if (logsArray[req.params.arrayIndex]) {
    res.json(logsArray[req.params.arrayIndex]);
  } else {
    res.redirect("/error")
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
      const deletedlog = logsArray.splice(req.params.arrayIndex, 1);
      res.status(200).json(deletedlog);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });
module.exports = logs;