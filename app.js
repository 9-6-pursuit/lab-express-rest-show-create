/** @format */

const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
global.logs = require("./models/log");
const app = express();
const logsController = require("./controllers/logsController");
const logsControllerV2 = require("./v2/controllers/logsController");

app.use(express.json())

app.get("/", (req, res) => {
	res.send("Welcome to the captain's log");
});

app.get("/logs", logsController.getAndFilter);
app.get("/logs/:id", logsController.getSingle);
app.post("/logs", logsController.postLogs);
app.delete("/logs/:id", logsController.deleteLog);
app.put("/logs/:id", logsController.updateLog);

app.get("/v2/logs", logsControllerV2.getIndex);
app.get("/v2/logs/:index", logsControllerV2.getShow);


app.use((req, res) => {
	res.status(404).send("404 Page Not Found");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});


module.exports = app