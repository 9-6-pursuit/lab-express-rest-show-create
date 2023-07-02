// DEPENDENCIES
const express = require("express");
const logs = require("./controllers/logsController.js");


// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("welcome to the captain's log");
});

app.use("/logs", logs);


// 404 PAGE
app.use("/*", (req, res) => {
    res.status(404).send("Sorry, no page found!");
  });

// EXPORT
module.exports = app;