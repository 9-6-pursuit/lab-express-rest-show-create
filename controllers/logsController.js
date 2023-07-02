const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");

//index
logs.get("/", (req, res) => {
    res.json(logsArray);
});

//show
logs.get("/:arrayIndex", (req,res) => {
    if(logsArray[req.params.arrayIndex]) {
        res.json(logsArray[req.params.arrayIndex]);
    } else {
        res.status(404).redirect("/404");
    }
});

//create
logs.post("/", (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
});

//destroy
logs.delete("/:indexArray", (req, res) => {
    const deletedLog = logsArray.splice(req.params.indexArray, 1);
    res.status(200).json(deletedLog);
});

//update 
logs.put("/:arrayIndex", (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
        logsArray[req.params.arrayIndex] = req.body;
        res.status(200).json(logsArray[req.params.arrayIndex]);
    } else {
        res.status(404).json( {error: "Not found" });
    }
});

module.exports = logs