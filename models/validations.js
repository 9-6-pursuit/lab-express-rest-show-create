const validateURL = (req, res, next) => {
    console.log(
      "Is valid URL or Is Not valid URL?"
    );
    next();
  };
  
  module.exports = { validateURL };