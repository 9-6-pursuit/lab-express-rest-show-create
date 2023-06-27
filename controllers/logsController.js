const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js")

logs.get("/" , (req,res) =>{
    res.json(logsArray)
})


// SHOW
logs.get("/:arrayIndex", (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
      res.json(logsArray[req.params.arrayIndex]);
    } else {
      res.redirect("/");
    }
  });


// CREATE
logs.post("/", (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
  });


module.exports = logs;