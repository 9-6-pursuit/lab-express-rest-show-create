const express =require("express")

//Configuration
const app =express()

//Middleware 
app.use(express.json())

//Routes
app.get("/", (req, res)=>{
    res.send("Welcome to captain's log")
})


const logsController = require("./controllers/logsController.js")
app.use("/logs", logsController)

//404 page
app.get("*", (req, res)=>{
    res.json({error: "Page not found"})
})

//Export
module.exports = app;