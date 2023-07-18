/** @format */

const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
global.logs = require("./models/log");
const app = express();
const logsController = require("./v2/controllers/logsController");

app.use(express.json())

app.get("/", (req, res) => {
	res.send("Welcome to the captain's log");
});

app.get("/logs", (req, res) => {
	let filteredLogs = [...logs];

	if (req.query.order === "asc") {
		filteredLogs.sort((a, b) => a.captainName.localeCompare(b.captainName));
	} else if (req.query.order === "desc") {
		filteredLogs.sort((a, b) => b.captainName.localeCompare(a.captainName));
	}

	if (req.query.mistakes === "true") {
		filteredLogs = filteredLogs.filter((log) => log.mistakesWereMadeToday);
	} else if (req.query.mistakes === "false") {
		filteredLogs = filteredLogs.filter((log) => !log.mistakesWereMadeToday);
	}

	if (req.query.lastCrisis === "gt10") {
		filteredLogs = filteredLogs.filter(
			(log) => log.daysSinceLastCrisis > 10
		);
	} else if (req.query.lastCrisis === "gte20") {
		filteredLogs = filteredLogs.filter(
			(log) => log.daysSinceLastCrisis >= 20
		);
	} else if (req.query.lastCrisis === "lte5") {
		filteredLogs = filteredLogs.filter(
			(log) => log.daysSinceLastCrisis <= 5
		);
	}

	res.json(filteredLogs);
});

app.get("/logs/:id", (req, res) => {
	const id = req.params.id;
	const log = logs[id];

	if (log) {
		res.json(log);
	} else {
		res.redirect("/404");
	}
});

app.post("/logs", (req, res) => {
	const newLog = req.body;

	if (
		typeof newLog.captainName !== "string" ||
		typeof newLog.title !== "string" ||
		typeof newLog.post !== "string" ||
		typeof newLog.mistakesWereMadeToday !== "boolean" ||
		isNaN(parseInt(newLog.daysSinceLastCrisis))
	) {
		return res.status(400).json({ error: "Invalid log data types" });
	}

	const newLastArrayPosition = logs.length;
	logs.push(newLog);

	res.set("Location", `/logs/${newLastArrayPosition}`);
	res.status(303).json(newLog);
});

app.get("/v2/logs", logsController.getIndex);
app.get("/v2/logs/:index", logsController.getShow);


app.use((req, res) => {
	res.status(404).send("404 Page Not Found");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});


module.exports = app