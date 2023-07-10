// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();
const cors = require("cors");
// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON
app.use(cors());

const logsController = require("./controllers/logsController.js");
app.use("/logs", logsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to the captain's log");
});


// 404 PAGE
app.get("/error", (req, res) => {
    res.status(404).json({ error: "Page not found" });
  });

// EXPORT
module.exports = app;