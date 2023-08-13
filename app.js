// DEPENDENCIES
const express = require("express");
const captainsArray = require('./models/log')

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON

//LETS APP KNOW TO MOVE ON TO NEXT BLOCK OF CODE
//RUNS FOR EVERY REQUEST
app.use((req, res, next) => {
    //console.log("This code runs for every request");
    next();
  });


//ROUTES
app.get('/', (req, res) => {
    res.send('welcome to the captains log')
})

//ALPHABETICAL AND REVERSED
app.get('/logs', (req, res, next) => {
    const {order} = req.query;
    if(order === 'asc') {
        let sortedCaptainsA = captainsArray.sort(function (a, b) {
            if (a.captainName < b.captainName) {
              return -1;
            }
            if (a.captainName > b.captainName) {
              return 1;
            }
            return 0;
          });
        res.send(sortedCaptainsA)
    } else if(order === 'dsc'){
        let sortedCaptainsB = captainsArray.sort(function (a, b) {
            if (a.captainName < b.captainName) {
              return -1;
            }
            if (a.captainName > b.captainName) {
              return 1;
            }
            return 0;
          });
        res.send(sortedCaptainsB.reverse())
    } else {
        next()
    }
    
});

//MISTAKES
app.get('/logs', (req, res, next) => {
    const { mistakes } = req.query;
    
    if (mistakes === 'true') {
        let foundMistakes = captainsArray.filter((element) => element.mistakesWereMadeToday === true )
        res.send(foundMistakes);
    } else if(mistakes === 'false'){
        let noMistakes = captainsArray.filter((element) => element.mistakesWereMadeToday === false )
        res.send(noMistakes);
    } else {
        next()
    }
});

//LAST CRISIS
app.get('/logs', (req, res, next) => {
    const { lastCrisis } = req.query;
    
    if (lastCrisis === 'gt10') {
        let greaterThanTen = captainsArray.filter((element) => element.daysSinceLastCrisis > 10 )
        res.send(greaterThanTen);
    } else if(lastCrisis === 'gte20'){
        let greaterThanTwenty = captainsArray.filter((element) => element.daysSinceLastCrisis >= 20 )
        res.send(greaterThanTwenty);
    } else if(lastCrisis === 'lte5'){
        let lessThanFive = captainsArray.filter((element) => element.daysSinceLastCrisis <= 5 )
        res.send(lessThanFive);
    }else {
        next()
    }
});

const captainsLogsController = require("./controllers/captainsLogs.controller.js");
app.use("/logs", captainsLogsController);




// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).json({ error: "Sorry, no page found!" });
  });

// EXPORT
module.exports = app;