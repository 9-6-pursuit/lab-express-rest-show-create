// DEPENDENCIES 
//Importing the express module
const express = require("express");

// CONFIGURATION
//Creating a express app
const app = express();

// MIDDLEWARE
// Parse incoming JSON
app.use(express.json()); 
// Importing the logs controller 
const logsController = require("./controllers/logsController.js");
app.use("/logs", logsController);
// ROUTES
//home route
app.get("/", (req, res) => {
  res.send("welcome to the captain's log");
});

// 404 PAGE
// "*" is an error catch all command
app.get("*", (req, res) => {
  // If the requested route does not exist, return a JSON response with an error message and set the status to 404 (Not Found)
    res.status(404).json({ error: "Not found" });
  });

//Exporting the express app
module.exports = app;