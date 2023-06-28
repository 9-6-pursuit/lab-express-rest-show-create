//DEPENDENCIES
const express = require("express");
const logsArray = require("../models/captainsLog");
// console.log(logsArray)

//CONFIGURATION
const logs = express.Router();

// INDEX
logs.get("/", (req, res) => {
  res.json(logsArray);
});
// logs.get("/", (req, res) => {
//     res.json(logsArray);

//   if (order === "asc") {
//       const sortedLogs = logEntries
//         .slice()
//         .sort((a, b) => a.captainName.localeCompare(b.captainName));
//       res.json(sortedLogs);
//     } else {
//       // Handle other cases or fallback behavior
//       res.json(logEntries);
//     }
//   });

//SHOW
logs.get("/:arrayIndex", (req, res) => {
  if (logsArray[req.params.arrayIndex]) {
    res.json(logsArray[req.params.arrayIndex]);
  } else {
    res.redirect("*");
  }
});

// CREATE
logs.post("/", (req, res) => {
  logsArray.push(req.body);
  res.json(logsArray[bookmarksArray.length - 1]);
});

// DELETE
logs.delete("/:indexArray", (req, res) => {
  const deletedLog = logsArray.splice(req.params.indexArray, 1);
  res.status(200).json(deletedLog);
});

module.exports = logs;
