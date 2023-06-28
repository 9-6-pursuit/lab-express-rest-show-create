const express = require("express")

const app = express();

//middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("wellcome to captain's log")
});

const logsController = require("./controllers/logsController.js");
app.use("/logs", logsController);


// 404 PAGE
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
  });


// EXPORT
module.exports = app;