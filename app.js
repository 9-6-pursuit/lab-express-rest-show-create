//DEPENDENCIES
const express = require("express");
const captainsLogController = require("./controllers/logsController");
const v2Controller = require("./v2/controllers/captainsLogController");

//CONFIGURATION
const app = express();

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use("/logs", captainsLogController);
app.use("/v2/logs", v2Controller);

app.get("/", (req, res) => {
  res.send("Welcome to the Captain's Log");
});

app.get("/logs", (req, res) => {
  res.json(logEntries);
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});
// app.get("*", (req, res) => {
//   res.status(401).send(`<img src="https://http.cat/400">`);
// });

module.exports = app;
