//DEPENDENCIES
const express = require("express");
const logsArray = require("../models/captainsLog");
// console.log(logsArray)

//CONFIGURATION
const logs = express.Router();

// INDEX
// logs.get("/", (req, res) => {
//   res.json(logsArray);

// INDEX W/ QUERIES:?ORDER ?MISTAKES ?LASTCRISIS
logs.get("/", (req, res) => {
  const order = req.query.order;
  const mistakes = req.query.mistakes;
  const lastCrisis = req.query.lastCrisis;

  let filteredLogs = logsArray.slice();
  // Sort logs based on order
  if (order === "asc") {
    filteredLogs.sort((a, b) => a.captainName.localeCompare(b.captainName));
  } else if (order === "desc") {
    filteredLogs.sort((a, b) => b.captainName.localeCompare(a.captainName));
  }
  // Filter logs based on mistakes
  if (mistakes === "true") {
    filteredLogs = filteredLogs.filter(
      (log) => log.mistakesWereMadeToday === true
    );
  } else if (mistakes === "false") {
    filteredLogs = filteredLogs.filter(
      (log) => log.mistakesWereMadeToday === false
    );
  }
  // Filter logs based on lastCrisis
  if (lastCrisis) {
    //OPERATOR:GT , VALUE:10
    const operator = lastCrisis.substring(0, 2);
    const value = parseInt(lastCrisis.substring(2));

    switch (operator) {
      case "gt": // GREATER THAN
        filteredLogs = filteredLogs.filter(
          (log) => log.daysSinceLastCrisis > value
        );
        break;
      case "gte": // GREATER THAN OR EQUAL
        filteredLogs = filteredLogs.filter(
          (log) => log.daysSinceLastCrisis >= value
        );
        break;
      case "lt": // LESS THAN
        filteredLogs = filteredLogs.filter(
          (log) => log.daysSinceLastCrisis < value
        );
        break;
      case "lte": // LESS THAN OR EQUAL
        filteredLogs = filteredLogs.filter(
          (log) => log.daysSinceLastCrisis <= value
        );
        break;
    }
  }
  res.json(filteredLogs);
});

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
  res.json(logsArray[logsArray.length - 1]);
});

// DELETE
logs.delete("/:arrayIndex", (req, res) => {
  if (logsArray[req.params.arrayIndex]) {
    const deletedLog = logsArray.splice(req.params.arrayIndex, 1);
    res.status(200).json(deletedLog);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// UPDATE
logs.put("/:arrayIndex", (req, res) => {
  if (logsArray[req.params.arrayIndex]) {
    logsArray[req.params.arrayIndex] = req.body;
    res.status(200).json(logsArray[req.params.arrayIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = logs;
