const express = require("express")
const logs = express.Router()
const logsArray= require("../models/log.js")


//Index
logs.get("/", (req, res)=>{
    res.json(logsArray)
})

//Show
logs.get("/:arrayIndex", (req, res)=>{
    if(logsArray[req.params.arrayIndex]){
        res.json(logsArray[req.params.arrayIndex])
    } else {
        res.status(404).redirect("/404")
    }
})

//Create
logs.post("/", (req, res)=>{
    logsArray.push(req.body)
    res.json(logsArray[logsArray.length-1])
})

//Delete
logs.delete("/:arrayIndex", (req, res)=>{
    if(logsArray[req.params.arrayIndex]){
        const deletedLog = logsArray.splice(req.params.arrayIndex, 1)
        res.json(deletedLog)
    } else {
        res.status(404).redirect("/404")
    }
})



module.exports=logs;