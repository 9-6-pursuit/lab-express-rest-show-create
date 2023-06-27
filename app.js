// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON

//ROUTES
const logsController = require("./controllers/logsController")
app.use("/logs", logsController);
app.get("/", (req, res) => {
    res.send("Welcome to the captain's log");
  });


  // 404 PAGE
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
  });

// EXPORT
module.exports = app;