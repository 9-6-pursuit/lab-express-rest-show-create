const express = require("express");
const captains = express.Router();
//GETTING ARRAY OF LOCATIONS FROM MODELS
const logsArray = require("../models/log.js");

captains.get("/", (req, res) => {
  res.json(logsArray);
});


//WITH ERROR HANDLING:
// SHOW
captains.get("/:arrayIndex", (req, res) => {
  if (logsArray[req.params.arrayIndex]) {
    res.json(logsArray[req.params.arrayIndex]);
  } else {
    res.redirect(404).json({ error: "Sorry, no page found!" });
  }
}); 

//CREATE
captains.post('/', (req, res) => {
  logsArray.push(req.body);
  res.json(logsArray[logsArray.length - 1]);
});

//DELETE
captains.delete("/:indexArray", (req, res) => {
  if (logsArray[req.params.indexArray]) {
    const deletedLog = logsArray.splice(req.params.indexArray, 1);
    res.status(200).json(deletedLog);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// UPDATE
captains.put("/:arrayIndex", (req, res) => {
  logsArray[req.params.arrayIndex] = req.body;
  res.status(200).json(logsArray[req.params.arrayIndex]);
});
  
module.exports = captains;