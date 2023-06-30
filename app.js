// DEPENDENCIES
const express = require("express");
const logsController = require("./controllers/logsController.js");
const v2LogsController = require("./v2/controllers/logsController.js")

// CONFIGURATION
const app = express();


// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON
app.use("/logs", logsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("welcome to the captain's log");
});





// 404 PAGE
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
  });

// EXPORT
module.exports = app;
