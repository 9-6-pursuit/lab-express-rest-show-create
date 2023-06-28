const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js")
const { validateURL } = require("../models/validation.js");

logs.get("/" , (req,res) =>{
    res.json(logsArray)
})

// SHOW
logs.get("/:arrayIndex", (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
      res.json(logsArray[req.params.arrayIndex]);
    } else {
      res.status(404).redirect('/');
    }
  });

// CREATE
logs.post("/", validateURL, (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
  });

// DELETE
logs.delete("/:indexArray", (req, res) => {
  if (logsArray[req.params.indexArray]) {
    const deletedlog = logsArray.splice(req.params.indexArray, 1);
    res.status(200).json(deletedlog);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// UPDATE
logs.put("/:arrayIndex", validateURL, async (req, res) => {
  if (logsArray[req.params.arrayIndex]) {
    logsArray[req.params.arrayIndex] = req.body;
    res.status(200).json(logsArray[req.params.arrayIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = logs;