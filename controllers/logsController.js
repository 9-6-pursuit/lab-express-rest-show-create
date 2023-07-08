const express = require("express");
// This was updated 7.7.23
// const logs = express();
const logs = express.Router();
const logsArray = require("../models/log.js");
// This was added 7.7.23
const { validateURL } = require("../models/validation.js");
// This was commented out 7.7.23
// logs.use(express.json());

// This was updated 7.7.23
// INDEX
logs.get("/", (req, res) => {
    // const foo = JSON.parse(JSON.stringify(logsArray));
  res.json(logsArray);
});

// logs.get("/", (req, res) => {
//     const foo = JSON.parse(JSON.stringify(logsArray));
//   res.status(200).json(foo);
// });

// SHOW
logs.get("/:arrayIndex", (req, res) => {
  if (logsArray[req.params.arrayIndex]) {
      res.json(logsArray[req.params.arrayIndex]);
  } else {
    // This was updated 7.7.23
    // res.status(404).redirect("/404");
      res.status(404).redirect("/");
  }
  });

// CREATE
// This was updated 7.7.23
// logs.post("/", (req, res) => {
logs.post("/", validateURL, (req, res) => {
    logsArray.push(req.body);
        res.json(logsArray[logsArray.length - 1]);
    });

// DELETE
// This was updated 7.7.23
logs.delete("/:indexArray", (req, res) => {
  if (logsArray[req.params.indexArray]) {
    const deletedlog = logsArray.splice(req.params.indexArray, 1);
    res.status(200).json(deletedlog);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});
// Previous
// logs.delete("/:indexArray", (req, res) => {
//     const deletedlog = logsArray.splice(req.params.indexArray, 1);
//     res.status(200).json(deletedlog);
//   });
  
// UPDATE
// This was updated 7.7.23
  logs.put("/:arrayIndex", validateURL, async (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
      logsArray[req.params.arrayIndex] = req.body;
      res.status(200).json(logsArray[req.params.arrayIndex]);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });

// logs.put("/:arrayIndex", (req, res) => {
//   logsArray[req.params.arrayIndex] = req.body;
//   res.status(200).json(logsArray[req.params.arrayIndex]);
// });


module.exports = logs;