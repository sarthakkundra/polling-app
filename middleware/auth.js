const jwt = require("jsonwebtoken");

const secret = "CBPollingApp";

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    const validToken = jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        next(Error("Failed to authenticate"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(Error("No Auth token present"));
  }
};
