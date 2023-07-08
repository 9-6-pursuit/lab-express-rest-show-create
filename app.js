
// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON

const logsController = require("./controllers/logsController");
app.use("/logs", logsController);

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to the captain's log");
  });

//   app.use("/logs", logs);

// 404 PAGEerror, logs & home page
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
  });


// EXPORT
module.exports = app;