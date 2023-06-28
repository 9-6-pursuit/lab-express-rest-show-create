const express = require("express")
const app = express()

app.use(express.json())

app.get("/",(req,res) => {
    res.send("Welcome to Captain's log")
})

const logsController = require("./controllers/logsController.js")
app.use("/logs",logsController)

app.get("*", (req, res) => {
    res.status(404).send("Sorry, no page found")
})

module.exports = app