//DEPENDENCIES
const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");
const { validateURL } = require("../models/validations.js")
const { validateLogDataTypes } = require("../models/validations.js");

//CONFIGURATION
/* logs.get("/", (req, res) => {
    res.json(logsArray);
});
*/

//we are using res.json instead of res.send because we are sending json instead of a simple string. 
//the res.json() is a method in Express that converts an array of objects into JSON format when sent to the client. The res.json() method automatically converts JavaScript objects or arrays into JSON format and ends the request.
//BONUS
logs.get("/", (req,res) => {
    const { order, mistakes, lastCrisis } = req.query; //here I am using object destructuring to assign properties from the req.query object; the object destructuring is creating variable names (order, mistakes, and lastCrisis). 

    //remember that req.query object is a part of the Express request object. it represents the query parameters of a URL. They are key-value pairs that appear agyer a ? in a URL. 
    //example: /logs?order=asc&mistakes=true >>> the query parameters are { order: "asc" and mistakes: "true"}

    let filteredLogs = [...logsArray]; //makes a shallow copy of the "logsArray"

    if (order) {
        filteredLogs = sortLogsByTitle(order);
    }

    if (mistakes !== undefined) {
       if (mistakes === "true") {
        filteredLogs = filterLogsByMistakes(true);
       } else if (mistakes === "false") {
        filteredLogs = filterLogsByMistakes(false);
       } 

       if (filteredLogs.length === 0) {
        filteredLogs = ["Sorry, no mistakes matched that search"];
       }
    }

    if (lastCrisis) {
        const [operator, value] = lastCrisis.split(/(?<=^\D+)(?=\d+)/); 
        //here I am using the split method with regEx to split the string into two parts: the operator (lessThan/ greaterThan etc.) and the value ( a #)
        //the regEx here (/(?<=^\D+)(?=\d+)/)  uses lookbehind (?<=^\D+) and lookahead (?=\d+) assertions to split the string where it transitions from non-digit characters to digits.
        filteredLogs =  filterLogsByLastCrisis(operator, Number(value));
    }
    
    res.json(filteredLogs);
})

//CREATE
//adding a route that will take data from the request body and push it into the logsArray
logs.post("/", validateURL, validateLogDataTypes, (req, res) => {
    const newLog = {
        captainName: req.body.captainName,
        title: req.body.title,
        post: req.body.post,
        mistakesWereMadeToday: req.body.mistakesWereMadeToday,
        daysSinceLastCrisis: req.body.daysSinceLastCrisis,
    }
    logsArray.push(newLog);
    res.json(logsArray[logsArray.length -1]);
});


//SHOW(READ)
//Get an individual view (show one log) with error handling:
logs.get("/:index", (req, res) => {
    if(logsArray[req.params.index]) {
        res.json(logsArray[req.params.index]);
    } else {
        res.status(404).json({ error: "Not found" })
    }
});

//sorts logs by title in alphabetical order
const sortLogsByTitle = (order) => {
    return order === "desc"
        ? logsArray.toSorted((a, b) => b.title.localeCompare(a.title))
        : logsArray.toSorted((a,b) => a.title.localeCompare(b.title));
};

//filter logs by mistakes
const filterLogsByMistakes = (mistakes) => {
    return logsArray.filter((log) => log.mistakesWereMadeToday === mistakes);
};

//filter logs by last crisis
const filterLogsByLastCrisis = (operator, value) => {
    //operator parameter represents the comparison operator to be used for filering the logs. 
    const operators = {
        gt: (a, b) => a > b,
        gte: (a, b) => a >= b, 
        lt: (a, b) => a < b, 
        lte: (a, b) => a <= b,
    }
    return logsArray.filter((log) => operators[operator](log.daysSinceLastCrisis, value)
    );
};

logs.delete("/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= logs.length) {
        res.status(404).json({ errror: "Page not found"});
    } else {
        const deletedLog = logsArray.splice(index, 1);//deletes one item @ specified index location
        res.send(deletedLog[0]);//I am returning deletedLog[0] because the splice method returns the item(s) removed from an array, hence it will be helpful to return the deleted item so the "captain" can see what was deleted.
    }
})

module.exports = logs;