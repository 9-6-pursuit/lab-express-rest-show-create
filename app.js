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
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
  });

// EXPORT
module.exports = app;