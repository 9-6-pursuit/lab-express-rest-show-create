const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");

//INDEX
logs.get("/", (req, res) => {
    res.json(logsArray);
  });

//SHOW
logs.get("/:arrayIndex", (req, res)=>{
  const { arrayIndex } = req.params //I'm gonna deconstruct, make it easier for me
  if(logsArray[arrayIndex]){ //Or if(logsArray[req.params.arrayIndex])
    res.json(logsArray[arrayIndex]) //Or res.json(logsArray[req.params.arrayIndex])
  } else {
    res.status(404).json({ error: "Not Found" })
  }
})

logs.get("/?order=asc",(req,res)=>{
    res.json(logsArray.sort((a,b) => a.captainName - b.captainName))
})

//CREATE
logs.post("/", (req, res) => {
  logsArray.push(req.body);
  res.json(logsArray[logsArray.length - 1]);
});

// DELETE
logs.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params
  const deletedLog = logsArray.splice(arrayIndex, 1); //Or const deletedLog = logsArray.splice(req.params.arrayIndex, 1);
  res.status(200).json(deletedLog);
});

// UPDATE
logs.put("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params
  logsArray[arrayIndex] = req.body;
  res.status(200).json(logsArray[arrayIndex]);
});


module.exports = logs;