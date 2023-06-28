const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log");
const { validateURL } = require("../models/validations.js");

logs.get("/", (req, res) => {
  res.json(logsArray);
});

// SHOW
logs.get("/:arrayIndex", (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
      res.json(logsArray[req.params.arrayIndex]);
    } else {
    //   res.status(404).json({ error: "PAge Not Found" });
    res.status(404).redirect("/logs");
    }
  });

  // CREATE
logs.post("/", validateURL, (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
  });

    // DELETE
logs.delete("/:indexArray", (req, res) => {
    const deletedLog = logsArray.splice(req.params.indexArray, 1);
    res.status(200).json(deletedLog);
  });

  
module.exports = logs;