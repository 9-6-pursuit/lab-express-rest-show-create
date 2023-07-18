const logs = global.logs;

exports.postLogs = (req, res) => {
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
}

exports.getSingle = (req, res) => {
    const id = req.params.id;
    const log = logs[id];
    if (log) {
        res.json(log);
    } else {
        res.redirect("/404");
    }
}

exports.getAndFilter = (req, res) => {
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
}

exports.deleteLog = (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < logs.length) {
        logs.splice(id, 1);
        res.sendStatus(204);
    } else {
        res.redirect("/404");
    }
};

exports.updateLog = (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < logs.length) {
        const updatedLog = req.body;
        if (
            typeof updatedLog.captainName !== "string" ||
            typeof updatedLog.title !== "string" ||
            typeof updatedLog.post !== "string" ||
            typeof updatedLog.mistakesWereMadeToday !== "boolean" ||
            isNaN(parseInt(updatedLog.daysSinceLastCrisis))
        ) {
            return res.status(400).json({ error: "Invalid log data types" });
        }
        logs[id] = updatedLog;
        res.sendStatus(204);
    } else {
        res.redirect("/404");
    }
};