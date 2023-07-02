// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON  

// ROUTES
app.get("/", (req, res) => {
    res.send(
        `<div>
        <h1> Welcome to the captain's log</h1>
        <ul>
        <li> <a href="/logs">Logs</a></li>
        </ul>
        <style>
        body {
            background: pink;
            display: grid;
            grid-template: row;
            text-align: center;
        }
        li {
            list-style: none;
        }
        </style>
        </div>`
    );
});
    
const logsController = require("./controllers/logsController.js");
app.use("/logs", logsController);
    
// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send({ error: "Page not found" });
});

// EXPORT
module.exports = app;
