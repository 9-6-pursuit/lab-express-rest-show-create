const express = require("express");

const app = express();


const captainsLogController = require("./controllers/captainsController");

app.use(express.json());

app.use("/logs", captainsLogController);

app.get("/", (req, res) => {
  res.send("Welcome to the Captain's Log");
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

module.exports = app;
