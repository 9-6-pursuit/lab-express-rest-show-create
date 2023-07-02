// Importing the express module
const express = require("express");
// Creating a new router instance
const logs = express.Router();
// Importing the log model
const logsArray = require("../models/log.js");

// GET/SHOW array of logs
logs.get("/", (req, res) => {
  // Return the entire logsArray as a JSON response
  res.json(logsArray); 
});

// SHOW only one log
logs.get("/:arrayIndex", (req, res) => {
  // If the requested arrayIndex exists in logsArray
  if (logsArray[req.params.arrayIndex]) {
    // Return the log at the specified arrayIndex
    res.json(logsArray[req.params.arrayIndex]); 
  } else {
    // If the requested arrayIndex does not exist, redirect to /logs 
    //and set the response status to 404 (Not Found)
    res.status(404).redirect("/logs"); 
  }
});

// CREATE/POST a new log
logs.post("/", (req, res) => {
  // Add the received request body as a new log to logsArray
  logsArray.push(req.body); 
  // Return the newly added log as a JSON response
  res.json(logsArray[logsArray.length - 1]); 
});

// PUT/UPDATE the log at a index
logs.put("/:arrayIndex", (req, res) => {
  // Get the updated log from the request body
  const updatedLog = req.body; 
  // If the requested arrayIndex exists in logsArray
  if (logsArray[req.params.arrayIndex]) {
    // Update the log at the specified arrayIndex with the updatedLog
    logsArray[req.params.arrayIndex] = updatedLog; 
    // Return the updated logsArray as a JSON response with the status 202 (Accepted)
    res.status(202).json(logsArray); 
  } else {
    // If the requested arrayIndex does not exist, return a JSON response with an error message and set the status to 404 (Not Found)
    res.status(404).json({ error: "Not Found" }); 
  }
});

// DELETE
logs.delete("/:indexArray", (req, res) => {
   // If the requested indexArray exists in logsArray
  if (logsArray[req.params.indexArray]) {
   // Remove the log at the specified indexArray from logsArray and store it in deletedLog
    const deletedLog = logsArray.splice(req.params.indexArray, 1); 
    // Return the deleted log as a JSON response with the status 200 (OK)
    res.status(200).json(deletedLog); 
  } else {
    // If the requested indexArray does not exist, return a JSON response with an error message and set the status to 404 (Not Found)
    res.status(404).json({ error: "Not Found" }); 
  }
});

// Exporting the logs router
module.exports = logs;
