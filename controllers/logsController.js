const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");

//INDEX
logs.get("/", (req, res) => {
  res.json(logsArray);
  console.log(req.query)
});

// SHOW
logs.get("/:arrayIndex", (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
      res.json(logsArray[req.params.arrayIndex]);
    } else {
      res.redirect({ error: "Not Found" });
    }
});

// CREATE
logs.post("/", (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
});

// DELETE
logs.delete("/:arrayIndex", (req, res) => {
  const deletedlog = logsArray.splice(req.params.arrayIndex, 1);
  if(deletedlog){
    res.status(200).json(deletedlog);
  }else {
    res.status(404).send({ error: "Not Found" });
  }
});

// UPDATE
logs.put("/:arrayIndex", (req, res) => {
  logsArray[req.params.arrayIndex] = req.body;
  res.status(200).json(logsArray[req.params.arrayIndex]);
});

module.exports = logs;