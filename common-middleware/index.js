const apiResponse = require("../helpers/api-response");
const jwt = require("jsonwebtoken");

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization || req.headers.authorization == "Bearer") {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = user;
    req.token = token;
    next();
  } else {
    return res.status(400).json(
      apiResponse({
        data: [],
        status: "BAD",
        errors: [],
        message: "Invalid Token",
      })
    );
  }
};

