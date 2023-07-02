const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");

logs.get("/", (req, res) => {
  res.json(logsArray);
});

// SHOW
logs.get("/:arrayIndex", (req, res) => {
    const arrayIndex = parseInt(req.params.arrayIndex);
  
    if (logsArray[arrayIndex]) {
      res.json(logsArray[arrayIndex]);
    } else {
      res.redirect("/404"); // Redirect to the 404 route
    }
  });
  

// CREATE
logs.post("/", (req, res) => {
  logsArray.push(req.body);
  res.json(logsArray[logsArray.length - 1]);
});

// UPDATE
logs.put("/:arrayIndex", (req, res) => {
  const arrayIndex = parseInt(req.params.arrayIndex);

  if (logsArray[arrayIndex]) {
    logsArray[arrayIndex] = req.body;
    res.json(logsArray[arrayIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// DELETE
logs.delete("/:arrayIndex", (req, res) => {
  const arrayIndex = parseInt(req.params.arrayIndex);

  if (logsArray[arrayIndex]) {
    const deletedLog = logsArray.splice(arrayIndex, 1);
    res.json(deletedLog[0]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = logs;
