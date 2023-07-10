const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");
// INDEX
logs.get("/", (req, res) => {
  res.json(logsArray);
});

// SHOW


// logs.get("/", (req, res) => {
//   console.log(req.query)
//   const { order } = req.query;
//   if ((order === "asc")) {
//    asc = logsArray.sort(a,b)
//     res.json(asc);
//   }
//   else if ((order === "desc")){
//     desc = logsArray.reverse()
//     res.json(desc)
//   }
// })

logs.get("/:arrayIndex", (req, res) => {
  if (logsArray[req.params.arrayIndex]) {
    res.json(logsArray[req.params.arrayIndex]);
  } else {
    res.redirect("/error")
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
      const deletedlog = logsArray.splice(req.params.arrayIndex, 1);
      res.status(200).json(deletedlog);
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