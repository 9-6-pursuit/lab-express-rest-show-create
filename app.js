//DEPENDENCIES
const express = require("express");

//CONFIGURATION
const app = express();
const logsController = require("./controllers/logsController.js");
const logsControllerV2 = require("./controllers/v2/controllers/logsController.js");

//MIDDLEWARE
app.use(express.json());

app.use((req, res, next) => {
    console.log("This code runs for every request");
    next();
});

//ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to the Captain's Log App!")
});

app.use("/logs", logsController);

app.use("/v2/logs", logsControllerV2);

//undefined route error
app.get("*", (req,res) => {
    res.status(404).json({ error: "Page not found" })
})
//EXPORT
module.exports = app;