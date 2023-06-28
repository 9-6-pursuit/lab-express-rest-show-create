const express = require("express");
// const logs = express.Router();
const logs = express();
const logsArray = require("../models/log.js");

logs.use(express.json());

// INDEX
logs.get("/", (req, res) => {
    const foo = JSON.parse(JSON.stringify(logsArray));
  res.status(200).json(foo);
});

// CREATE
logs.post("/", (req, res) => {
    logsArray.push(req.body);
        res.json(logsArray[ogsArray.length - 1]);
    });

// SHOW
logs.get("/:arrayIndex", (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
        res.json(logsArray[req.params.arrayIndex]);
    } else {
        res.status(404).redirect("/404");
    }
    });

// DELETE
logs.delete("/:indexArray", (req, res) => {
    const deletedlog = logsArray.splice(req.params.indexArray, 1);
    res.status(200).json(deletedlog);
  });
  
// UPDATE
  logs.put("/:arrayIndex", (req, res) => {
    logsArray[req.params.arrayIndex] = req.body;
    res.status(200).json(logsArray[req.params.arrayIndex]);
  });
  

module.exports = logs;