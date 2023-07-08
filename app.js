
// DEPENDENCIES
// added 7.8.23
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
// added 7.8.23
app.use(express.json()); // Parse incoming JSON
app.use(cors());

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