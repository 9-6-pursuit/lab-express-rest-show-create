// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();
const logsController = require("./controllers/logsController.js");

// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON
app.use((req, res, next) => {
    console.log("This code runs for every request");
    next();
  });
  
// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to logs App");
});

app.use("/logs", logsController);

// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
  });

// EXPORT
module.exports = app;