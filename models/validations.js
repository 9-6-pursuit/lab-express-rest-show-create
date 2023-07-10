//MIDDLEWARE FOR SPECIFIC ROUTES
const validateURL = (req, res, next) => {
    if(
        req.body.url.substring(0, 7) === "http://" ||
        req.body.url.substring(0, 8) === "https://"
        //we can also use regularExpressions>>> with the .match():
        //req.body.url.match(/https?:\/\//);
    ) {
        return next();
    } else {
        res 
            .status(400)
            .send(`Oops, you forgot to start your url with http:// or https://`)
    }
};

const validateLogDataTypes = (req, res, next) => {
    const { captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis } = req.body;

    if (
        typeof captainName !== "string" ||
        typeof title !== "string" ||
        typeof post !== "string" ||
        typeof mistakesWereMadeToday !== "boolean" ||
        typeof daysSinceLastCrisis !== "number"
    ) {
        res
            .status(400)
            .json( { error: "Invalid data type(s) entered" });
    } else {
        next();
    }
};

//EXPORT
module.exports = { validateURL, validateLogDataTypes }